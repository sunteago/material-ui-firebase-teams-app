import React from 'react'
import PageContainer from '../components/Layout/PageContainer'
import { useParams } from 'react-router-dom'

export default function News() {
    const params = useParams();
    console.log(params);
    return (
        <PageContainer>
            News
        </PageContainer>
    )
}
