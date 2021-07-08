import * as React from 'react';
import styled from 'styled-components';
import { Editable, EditableProps } from '../Editable';

const H1 = styled.h1`
    font-size: 32px;
`;

const h1 = {
    color: 'blue',
    'font-size': '32px',
};

interface HeadlineProps extends EditableProps {}

export const Headline = (props: HeadlineProps) => {
    return (
        // <H1>
        <h1 style={h1}>
            <Editable {...props} />
        </h1>
        // </H1>
    );
};
