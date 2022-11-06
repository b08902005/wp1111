import { Router } from "express";
import ScoreCard from "../models/ScoreCard";
const router = Router();
router.delete("/cards", (req, res) => {
    ScoreCard.deleteMany({}, () => {
        res.send({ message: 'Database cleared' });
    });

});
router.post("/card", (req, res) => {
    req.once('data', (data) => {
        const { name, subject, score } = JSON.parse(data);
        const scorecard
            = new ScoreCard({ name: name, subject: subject, score: score });
        ScoreCard.find({ name: name, subject: subject }, async (err, scorecards) => {
            if (err) {
                res.send({ message: `Adding (${name}, ${subject}, ${score}) fails`, card: false })
            } else {
                if (scorecards.length === 0) {
                    try {
                        await scorecard.save();
                        res.send({ message: `Adding (${name}, ${subject}, ${score})`, card: true });
                        return;
                    } catch (e) {
                        throw new Error
                            ("ScoreCard DB save error: " + e);
                    }
                } else {
                    try {
                        await ScoreCard.findOneAndUpdate({ name: name, subject: subject }, { score: score });
                        // await scorecard.save();
                        res.send({ message: `Updating (${name}, ${subject}, ${score})`, card: true })
                        return;
                    } catch (e) {
                        throw new Error
                            ("ScoreCard DB save error: " + e);
                    }
                }
            }
        });
    })
});
router.get("/cards", (req, res) => {
    const { type, queryString } = req.query
    if (type === 'name') {
        ScoreCard.find({name: queryString}, async (err, scorecards) => {
            if (err) {
                res.send({ message: 'Find Failure!' })
            }
            else {
                if (scorecards.length === 0) {
                    try {
                        res.send({ message: `Name (${queryString}) not found!` });
                        return;
                    } catch (e) {
                        throw new Error
                            ("Find in ScoreCard DB error: " + e);
                    }
                } else {
                    try {
                        let messages = []
                        await scorecards.forEach((scorecard) => {
                            let {name, subject, score} = scorecard;
                            messages.push(`Found card with name: (${name}, ${subject}, ${score})`);
                        });
                        res.send({ messages: messages });
                        return;
                    } catch (e) {
                        throw new Error
                            ("Find in ScoreCard DB error: " + e);
                    }
                }
            }
        })
    } else if (type === 'subject') {
        ScoreCard.find({subject: queryString}, async (err, scorecards) => {
            if (err) {
                res.send({ messages: false, message: 'Find Failure!' })
            }
            else {
                if (scorecards.length === 0) {
                    try {
                        res.send({ message: `Subject (${queryString}) not found!` });
                        return;
                    } catch (e) {
                        throw new Error
                            ("Find in ScoreCard DB error: " + e);
                    }
                } else {
                    try {
                        let messages = []
                        scorecards.forEach((scorecard) => {
                            let {name, subject, score} = scorecard;
                            messages.push(`Found card with subject: (${name}, ${subject}, ${score})`);
                        });
                        res.send({ messages: messages });
                        return;
                    } catch (e) {
                        throw new Error
                            ("ScoreCard DB save error: " + e);
                    }
                }
            }
        })
    } else {
        res.send({ messages: '', message: 'Unknown type query!' })
    }
});
export default router;