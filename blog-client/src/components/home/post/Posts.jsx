import { useEffect, useState } from 'react';

import { Grid, Box } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';

// import { getAllPosts } from '../../../service/api';
// import { API } from '../../../service/axios';

//components
import Post from './Post';
import { getAllBlog } from '../../../Api/blog';

const Posts = () => {
    const [posts, getPosts] = useState([]);
    
    const [searchParams] = useSearchParams();
    const category = searchParams.get('category');

    useEffect(() => {
        const fetchData = async () => { 
            const response = await getAllBlog()
            console.log(response)
            // let response = await API.getAllPosts({ category : category || '' });
            // if (response.isSuccess) {
                getPosts(response);
                console.log(posts)
            // }
        }
        fetchData();
    }, [category]);

    return (
        <>
            {
                
                posts ? posts.map(post => (
                    <Grid item lg={3} sm={4} xs={12}>
                        <Link style={{textDecoration: 'none', color: 'inherit'}} to={`details/${post.id}`}>
                            <Post post={post} />
                        </Link>
                    </Grid>
                )) : <Box style={{color: '878787', margin: '30px 80px', fontSize: 18}}>
                        No data is available for selected category
                    </Box>
            }
        </>
    )
}

export default Posts;