import React from 'react'
import { Paper } from '@material-ui/core'

export default function GroupMember({role}) {
    return (
        <Paper style={{width: '100%'}}>
            {role}
        </Paper>
    )
}
