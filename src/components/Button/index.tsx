import * as React from 'react';
import { ReactNode } from 'react';
import styled from 'styled-components';

interface ButtonProps {
    children: ReactNode;
}

const StyledButton = styled.a`
    color: blue;
    border: 1px solid black;

    &:hover {
        background-color: grey;
    }
`;

export const Button = (props: ButtonProps) => (
    <StyledButton>{props.children}</StyledButton>
);
