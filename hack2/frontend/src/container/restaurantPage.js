/****************************************************************************
  FileName      [ restaurantPage.js ]
  PackageName   [ src ]
  Author        [ Chin-Yi Cheng ]
  Synopsis      [ Implement the restaurant page ]
  Copyright     [ 2022 11 ]
****************************************************************************/

import React, { useState, useEffect } from 'react'
import '../css/restaurantPage.css'
import Information from './information';
import Comment from './comment';
import { useParams } from 'react-router-dom'

import axios from 'axios'
const instance = axios.create({
    baseURL: 'http://localhost:4000/api'
})

const RestaurantPage = () => {
    const { id } = useParams()
    const [info, setInfo] = useState({})
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState(0)
    const getInfo = async () => {
        // TODO Part III-2: get a restaurant's info
        // console.log(id)
        const {
            data: { message, contents },
        } = await instance.get('/getInfo', {
            params: { id: id }
        });
        setInfo(contents)
        getComments()
    }
    const getComments = async () => {
        // TODO Part III-3: get a restaurant's comments
        const {
            data: { message, contents },
        } = await instance.get('/getCommentsByRestaurantId', {
            params: { restaurantId: id }
        });
        // console.log(contents);
        setComments(contents)
    }
    useEffect(() => {
        if (Object.keys(info).length === 0) {
            getInfo()
        }
    }, [])

    useEffect(() => {
        // TODO Part III-3-c: update the comment display immediately after submission
        updateRating();
    }, [comments])

    /* TODO Part III-2-b: calculate the average rating of the restaurant */

    const updateRating = () => {
        // console.log('update rating');
        let tmp = 0
        if (comments.length === 0)  return;
        for (let comment of comments) {
            tmp += comment.rating;
        }
        tmp /= comments.length
        // console.log(tmp);
        setRating(tmp);
    }


    return (
        <div className='restaurantPageContainer'>
            {Object.keys(info).length === 0 ? <></> : <Information info={info} rating={rating} />}
            <Comment restaurantId={id} comments={comments} setComments={setComments} setLoad={setLoading} />
        </div>
    )
}
export default RestaurantPage