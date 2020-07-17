import React from 'react'
import {useSelector} from 'react-redux';

export default function Notifications() {
    const notifications = useSelector(state => state.userData.notifications);
    return (
        <div>
            
        </div>
    )
}
