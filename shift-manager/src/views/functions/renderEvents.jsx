import React from 'react'
import { Divider } from 'primereact/divider';
import { useState } from 'react';


export const RenderEventsData = props => {
    const [counter, setCounter] = useState(0)
    return (
        <>
            <h3>{props.row.id}</h3>
            <h6>Alerts:</h6>
            {props.row.production.alerts.map(alert => {
                return (
                    <>
                        <Divider align="left">
                            <b>{alert.title} - {alert.time}</b>
                        </Divider>
                        <p>
                            {alert.content}
                        </p>
                        {/* Mapping the comments if there are any */}
                        {alert.comments && alert.comments.map((comment, index = 0) => {
                            return (
                                <>
                                    <b>{`comment #${++index}`}</b>
                                    <p>
                                        {comment.content}
                                    </p>
                                </>
                            )
                        })}
                    </>
                )
            })}
            <h6>To Follow:</h6>
            <p>{props.row.production.follows.map(follow => {
                <>
                    <Divider align="left">
                        <b>{follow.comments[0].user} - {follow.comments[0].time}</b>
                    </Divider>
                    <p>
                        {follow.comments[0].content}
                    </p>
                </>
            })}</p></>
    )
}