import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllPosts, getAllUsers } from 'redux/actions/app';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

const mapStateToProps = state => ({
    users: state.app.users
})

class User extends Component {

    render() {
        
        const { users: { users }, match: { params : { id } } } = this.props;
        const user = users.find((item => item.id == id))

        return (
            <MainSection>
                <Header>
                    <Back onClick={() => this.props.history.push('/')}> Back </Back>
                </Header>
                <UserSection>
                    <SideSection>
                        {user.name}
                        <Email>
                            <Tile>Email</Tile>: <small>{user.email}</small>
                        </Email>
                        <Email>
                            <Tile>Username</Tile>: <small>{user.username}</small>
                        </Email>
                    </SideSection>
                    <DetailsSection>
                        <Info>
                            <HeaderTitle>Official Inforamation</HeaderTitle>
                            <Container>
                                <Item>
                                    <Title>Company</Title>
                                    <Body>
                                        <span>{user.company.name}</span>
                                        <span>{user.company.catchPhrase}</span>
                                        <span>{user.company.bs}</span>
                                    </Body>
                                </Item>
                                <Item>
                                    <Title>Website</Title>
                                    <Body>
                                        <span>{user.website}</span>
                                    </Body>
                                </Item>
                            </Container>
                        </Info>
                        <Info>
                            <HeaderTitle>Personal Inforamation</HeaderTitle>
                            <Container>
                                <Item>
                                    <Title>Phone</Title>
                                    <Body>
                                        {user.phone}
                                    </Body>
                                </Item>
                                <Item>
                                    <Title>Address</Title>
                                    <Body>
                                        <span>{user.address.suite}</span>
                                        <span>{user.address.street}</span>
                                        <span>{user.address.city}-{user.address.zipcode}</span>
                                    </Body>
                                </Item>
                            </Container>
                        </Info>
                    </DetailsSection>
                </UserSection>
            </MainSection>
        )
    }
}

export default connect(mapStateToProps, null)(withRouter(User));

const Container = styled.div`
    display: flex;
`;

const DetailsSection = styled.div`
    display: flex;
    flex-direction: column;
    border-left: 1px solid #e8d5e8;
`;

const SideSection = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 80px;
`;

const Info = styled.div`
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #dadfe3;
    padding: 40px;
`;

const MainSection = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 6px;
    height: 100vh;
    flex-direction: column;
`;

const Item = styled.div`
    margin: 20px;
`;

const UserSection = styled.div`
    display: flex;
    border: 1px solid #dadfe3;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
`;

const Email = styled.div`
    font-size: 10px;
    margin-top: 10px;
    display: flex;

    small {
        font-weight: 800;
        margin-left: 4px;
        font-size: 10px;
    }
`;

const Title = styled.div`
    margin-bottom: 10px;
    font-weight: 600;
`;

const Tile = styled.div`
    
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

const Header = styled.div`
    
`;

const Back = styled.button`
    margin-bottom: 20px;
    border-radius: 4px;
    background: #fff;
    padding: 5px 10px;
    border-color: brown;
`;
