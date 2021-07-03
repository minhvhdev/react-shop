import React from 'react'

function Notification(props) {
    const listNoti = props.listNoti;
    return (
        <ul id="noti">
            {listNoti.map((item, index) => {
                return (
                    <li key={index} className="noti"><a draggable="false" href={item.link}>
                        <div className="d-flex">
                            <div className="noti__avatar">
                                <img src={item.avatarLink} alt="from avatar" />
                            </div>
                            <div className="noti__desc">
                                <p className="noti__desc--tittle">{item.title}</p>
                                <p className="noti__desc--content">{item.content}</p>
                                <p className="noti__desc--time">{item.createTime}</p>
                            </div>
                        </div>
                    </a>
                    </li>
                )
            })}
        </ul>
    )
}

export default Notification
