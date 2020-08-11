import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPosts, getAllUsers } from 'redux/actions/app';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    posts: state.app.posts,
    users: state.app.users
})

class Post extends Component {

    constructor(props) {
        super(props)
        const { posts: { posts }, match: { params : { id } }, users: { users } } = props;
        const post = posts.find((item => item.id == id))
        const user = users.find((item => item.id == post.userId))
        this.state = {
            comments: [],
            post,
            user,
            id
        }
    }

    componentDidMount() {
        const { id, post, user} = this.state;

        fetch(`https://jsonplaceholder.typicode.com/posts/${id}/comments`)
            .then((data) => {
                return data.json()
            })
            .then((data) => {
                this.setState({
                    comments: data
                })
            })
    }

    render() {
        const { id, post, user, comments} = this.state;

        return (
            <MainSection>
                <Header>
                    <Back onClick={() => this.props.history.push('/')}> Back </Back>
                </Header>
                <UserSection>
                    <DetailsSection>
                        <Info>
                            <HeaderTitle>Title</HeaderTitle>
                            <Container>
                                <Item>
                                    <Body>
                                        <span>{post.title}</span>
                                    </Body>
                                </Item>
                            </Container>
                        </Info>
                        <Info>
                            <HeaderTitle>BODY</HeaderTitle>
                            <Container>
                                <Item>
                                    <Body>
                                        <span>{post.body}</span>
                                    </Body>
                                </Item>
                            </Container>
                        </Info>
                    </DetailsSection>
                    <CommentsSection>
                        <Title>Comments</Title>
                        {
                            comments.map(item => {
                                return (
                                    <Comment>
                                        <CreatedBy>
                                            <div>Created By</div>: <small>{item.email}</small>
                                        </CreatedBy>
                                        <Subject>{item.name}</Subject>
                                        <CommentBody>{item.body}</CommentBody>
                                    </Comment>
                                )
                            })
                        }
                    </CommentsSection>
                </UserSection>
            </MainSection>
        )
    }
}

export default connect(mapStateToProps, null)(withRouter(Post));

const Container = styled.div`
    display: flex;
`;

const DetailsSection = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #e8d5e8;
`;

const CommentsSection = styled.div`
    margin-top: 20px;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    padding: 40px;
`;

const MainSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    flex-direction: column;
`;

const Item = styled.div`
    margin: 20px;
`;

const UserSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    max-width: 1000px;
`;

const Title = styled.div`
    margin-bottom: 10px;
    font-weight: 600;
`;

const CreatedBy = styled.div`
    margin: 5px;
    display: flex;
    align-items: center;
    
    small {
        font-weight: 800;
        margin-left: 4px;
        font-size: 10px;
    }
`;

const Subject = styled.div`
    margin: 5px;
`;

const Header = styled.div`
`;

const Comment = styled.div`
    padding: 10px;
`;

const CommentBody = styled.div`
    margin: 5px;
`;


const Body = styled.div`
    display: flex; 
    flex-direction: column;
    color: #475867;
    font-family: cursive;
`;
const HeaderTitle = styled.div`
    color: #8e9294;
`;

const Back = styled.button`
    margin-bottom: 20px;
    border-radius: 4px;
    background: #fff;
    padding: 5px 10px;
    border-color: brown;
`;
