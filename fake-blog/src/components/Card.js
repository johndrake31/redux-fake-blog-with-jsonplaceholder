import React from 'react';
import { Card, CardContent, Typography } from '@mui/material';

export const CustomCard = ({ post }) => {
    return (
        
            <Card key={post.id} sx={{
                margin: 2,
                padding: 2,
                backgroundColor: '#333333',
                color: 'white',
            }}>
                <CardContent>
                    <Typography variant="h4" sx={{marginBottom: 5}}>{post.title}</Typography>
                    <Typography>{post.body}</Typography>
                </CardContent>
            </Card>
      
    )
}

export default CustomCard;