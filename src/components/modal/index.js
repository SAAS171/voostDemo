import React from 'react'
import * as Style from './style/modal'

export default function Modal({children, ...props}) {
    return <Style.Container {...props}>{children}</Style.Container>
}

Modal.Form = function ModalForm({children, ...props}) {
    return <Style.Form {...props}>{children}</Style.Form>
}

Modal.Title = function ModalTitle({children, ...props}) {
    return <Style.Title {...props}>{children}</Style.Title>
}

Modal.SubTitle = function ModalSubTitle({children, ...props}) {
    return <Style.SubTitle {...props}>{children}</Style.SubTitle>
}

Modal.Text = function ModalText({children,...props}) {
    return <Style.Text {...props}>{children}</Style.Text>
}

Modal.Button = function ModalButton({children, ...props}) {
    return <Style.Button {...props} onClick={props.onClick}>{children}</Style.Button>
}

Modal.InversedButton = function ModalInversedButton({children, ...props}) {
    return <Style.InversedButton {...props} onClick={props.onClick} color={props.color}>{children}</Style.InversedButton>
}

Modal.Wrapper = function ModalWrapper({children, ...props}) {
    return <Style.Wrapper {...props}>{children}</Style.Wrapper>
}

Modal.ButtonWrapper = function ModalButtonWrapper({children, ...props}) {
    return <Style.ButtonWrapper {...props}>{children}</Style.ButtonWrapper>
}

Modal.Inner = function ModalInner({children, ...props}) {
    return <Style.Inner {...props}>{children}</Style.Inner>
}