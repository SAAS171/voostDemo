import styled from 'styled-components';

export const Navbar = styled.div`
    display: none;

    @media (max-width: 830px) {
        width: 50px;
        height: 50px;
        top: 20px;
        right: 20px;
        position: fixed;

        display: flex;
        flex-direction: column;
        justify-content: center;

        background-color: #fff;
        border-radius: 50%;
        box-shadow: 5px 5px 16px 0px rgba(50, 50, 50, 0.63);

        transition: all .2s;

        z-index: 800;

        &:active {
            transform: rotate(-90deg);
        }
    }
`
export const Nav = styled.nav`
    background-color: black;
`

export const Sidebar = styled.div`
`


export const I = styled.i`
    font-size: 30px;
`