import express from 'express'
import { getNumber, genNumber } from '../core/getNumber'

const router = express.Router()
router.post('/start', (_, res) => {
    genNumber() // 用亂數產生一個猜數字的 number，存在 memory DB
    res.json({ msg: 'The game has started.' })
})
router.get('/guess', (req, res) => {
    const solution = Number(req.query.number);
    const number = getNumber();
    if (solution > 100 || solution < 1){
        res.status(406).send({ msg: 'Not a legal number.' });
    }
    else{
        if (solution === number){
            res.status(200).send({ msg: 'Equal' });
        }else if (solution < number){
            res.status(200).send({ msg: 'Bigger' });
        }else if (solution > number){
            res.status(200).send({ msg: 'Smaller' });
        }
    }
    // 去 (memory) DB 拿答案的數字
    // 用 req.query.number 拿到前端輸入的數字
    // check if NOT a num or not in range [1,100]
    // 如果有問題 =>
    // res.status(406).send({ msg: 'Not a legal number.' })
    // 如果沒有問題，回傳 status
})
router.post('/restart', (_, res) => {
    genNumber() // 用亂數產生一個猜數字的 number，存在 memory DB
    res.json({ msg: 'The game has started.' })
})
export default router