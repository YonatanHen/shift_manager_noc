import React from 'react'
import { Divider } from 'primereact/divider';

export const RenderEventsData = props => {
    return (
        <>
            <h3>{props.row.id}</h3>
            <h6>Alerts:</h6>
            {props.row.production.alerts.map(alert => {
                return (
                    <>
                        <Divider align="left">
                            <b>{alert.comments[0].user} - {alert.comments[0].time}</b>
                        </Divider>
                        <p>
                            {alert.comments[0].content}
                        </p>
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