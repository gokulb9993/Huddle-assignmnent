import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPosts, getAllUsers } from 'redux/actions/app';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';
import debounce from 'lodash/debounce';

const mapStateToProps = state => ({
    posts: state.app.posts,
    users: state.app.users
})

const mapDispatchToProps = dispatch => ({
    getAllPosts: () => dispatch(getAllPosts()),
    getAllUsers: () => dispatch(getAllUsers())
});

class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
            userssuggestions: [],
            value: ''
        }
    }

    componentDidMount() {
        if(!this.props.posts.posts.length) this.props.getAllPosts();
        if(!this.props.users.users.length) this.props.getAllUsers();
    }

    onInputChange = (e) => {
        const userssuggestions = this.props.users.users.filter(user => user.name.includes(e.target.value))
        this.setState({userssuggestions, value: e.target.value});
    }

    debouncedInput = debounce(this.onInputChange.bind(this), 500)

    onChange = (e) => {
        e.persist();
        this.debouncedInput(e);
    }

    render() {
        const { isLoading, hasError, posts } = this.props.posts;
        const { users } = this.props.users;
        const { userssuggestions, value } = this.state;

        if(isLoading || this.props.users.isLoading) return null;

        return ( 
            <Container>
                <SearchBar>
                    <Input>
                        <input placeholder="Search user" onChange={this.onChange}/>
                        {value && <Suggestions>
                            {userssuggestions.map(item => {
                                return <Item onClick={() => this.props.history.push(`/user/${item.id}`)}>{item.name}</Item>
                            })}
                        </Suggestions>
                        }
                    </Input>
                </SearchBar>
                {
                    posts.map(post => {
                        const user = users.find((item => item.id == post.userId))
                        return (
                            <Post key={post.id}>
                                <Title onClick={() => this.props.history.push(`/post/${post.id}`)}>
                                    {post.title}
                                </Title>
                                <User onClick={() => this.props.history.push(`/user/${post.userId}`)}>
                                    {user.name}
                                    <Email>
                                        {user.email}
                                    </Email>
                                </User>
                            </Post>
                        )
                    })
                }
            </Container>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Home));

const Container = styled.div`
    margin: auto;
    max-width: 1000px;
`;

const Post = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 30px;
    border-bottom: 1px solid #dadfe3;
    margin: 5px;
`;

const Title = styled.div`
    text-transform: capitalize;
    cursor: pointer;
`;

const User = styled.div`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    cursor: pointer;
`;

const Email = styled.div`
    font-size: 10px;
    margin-top: 5px;
`;

const SearchBar = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    margin: 30px;
    
    input {
        padding: 10px;
        width: 180px;
        border: 1px solid #dadfe3;
    }
`;

const Input = styled.div`
    width: 200px;
`;

const Suggestions = styled.div`
    position: absolute;
    top: 31px;
    margin: 5px 0;
    background: #fff;
    border: 1px solid #dadfe3;
    border-radius: 4px;
    width: inherit;
`;

const Item = styled.div`
    padding: 10px;
    cursor: pointer;
`;