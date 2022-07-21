import React from 'react'
import * as Style from './style/review'

function QuestionReview({children, ...props}) {
    return <Style.ReviewContainer {...props}>{children}</Style.ReviewContainer>
}

QuestionReview.Section = function QuestionReviewSection({children, ...props}) {
    return <Style.ReviewSection {...props}>{children}</Style.ReviewSection>
}

QuestionReview.Header = function QuestionReviewHeader({children, ...props}) {
    return <Style.ReviewHeader {...props}>{children}</Style.ReviewHeader>
}

QuestionReview.Title = function QuestionReviewTitle({children, ...props}) {
    return <Style.ReviewTitle {...props}>{children}</Style.ReviewTitle>
}

QuestionReview.SubTitle = function QuestionReviewSubTitle({children, ...props}) {
    return <Style.ReviewSubTitle {...props}>{children}</Style.ReviewSubTitle>
}

QuestionReview.Text = function QuestionReviewText({children, ...props}) {
    return <Style.ReviewText {...props}>{children}</Style.ReviewText>
}

QuestionReview.Body = function QuestionReviewBody({children, ...props}) {
    return <Style.ReviewBody {...props}>{children}</Style.ReviewBody>
}

QuestionReview.HeaderColorized = function QuestionHeaderColorized({children, ...props}) {
    return <Style.ReviewHeaderColorised {...props}>{children}</Style.ReviewHeaderColorised>
}

QuestionReview.ReviewInner = function QuestionHeaderInner({children, ...props}) {
    return <Style.ReviewInner {...props}>{children}</Style.ReviewInner>
}

QuestionReview.ColorisedHeaderText = function QuestionColorisedHeaderText({children, ...props}) {
    return <Style.ReviewHeaderColorisedText {...props}>{children}</Style.ReviewHeaderColorisedText>
}

QuestionReview.ReviewEditAction = function QuestionReviewEditAction({children, ...props}) {
    return <Style.ReviewEditAction {...props}>{children}</Style.ReviewEditAction>
}

QuestionReview.IconButton = function QuestionIconButton({children, ...props}) {
    return <Style.ReviewIconButton color={props.color} onClick={props.onClick}>{children}</Style.ReviewIconButton>
}

QuestionReview.ButtonWrapper = function QuestionButtonWrapper({children,...props}) {
    return <Style.ReviewButtonWrapper {...props}>{children}</Style.ReviewButtonWrapper>
}

export default QuestionReview;