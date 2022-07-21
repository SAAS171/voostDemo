import React from 'react'
import { NavLink } from 'react-router-dom'
import * as Style from './styles/accountQuestionsCard'
import Button from '../shared-components/button'

function AccountQuestionsCard() {
    return (
        <React.Fragment>
            <Style.Card>
                <Style.Title>Pre-recorded Questions</Style.Title>
                    <NavLink to='/recruiter/questions'>
                        <Button type="primarySmall" text='Start' />
                    </NavLink>
                </Style.Card>
        </React.Fragment>
    )
}

export default AccountQuestionsCard;