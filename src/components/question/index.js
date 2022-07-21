import React from 'react'
import * as Style from './style/question'

const Question = function Question({children, ...props}) {
    return <Style.Container {...props}>{children}</Style.Container>
}

Question.Section = function QuestionSection({children, ...props}) {
    return <Style.Section {...props}>{children}</Style.Section>
}

Question.Form = function QuestionForm({children, ...props}) {
    return <Style.Form {...props}>{children}</Style.Form>
}

Question.Title = function QuestionTitle({children, ...props}) {
    return <Style.Title {...props}>{children}</Style.Title>
}

Question.SubTitle = function QuestionSubTitle({children, ...props}) {
    return <Style.SubTitle {...props}>{children}</Style.SubTitle>
}

Question.Text = function QuestionText({children, ...props}) {
    return <Style.Text {...props}>{children}</Style.Text>
}

Question.Image = function QuestionImage({...props}) {
    return <Style.Image src={props.source} altText={props.altText} />
}

Question.Video = function QuestionVideo({...props}) {
    return <Style.Video src={props.source} altText={props.altText} />
}

Question.Input = function QuestionInput({children, ...props}) {
    return <Style.Input type={props.type} disabled={props.disabled} placeholder={props.placeholder} />
}

Question.Select = function QuestionSelect({children, ...props}) {
    return <Style.Select {...props} onChange={props.onChange}>{children}</Style.Select>
}

Question.Option = function QuestionOption({children, ...props}) {
    return <Style.SelectOption {...props}>{children}</Style.SelectOption>
}

Question.Label = function QuestionLabel({children, ...props}) {
    return <Style.Label {...props}>{children}</Style.Label>
}

Question.Group = function QuestionGroup({children, ...props }) {
    return <Style.Group {...props}>{children}</Style.Group>
}

Question.Field = function QuestionField({children, ...props}) {
    return <Style.Field {...props}>{children}</Style.Field>
}

Question.PrimaryButton = function QuestionPrimaryButton({children, ...props}) {
    return <Style.PrimaryButton {...props} onClick={props.onClick}>{children}</Style.PrimaryButton>
}

Question.Button = function QuestionButton({children, ...props}) {
    return <Style.Button {...props} onClick={props.onClick}>{children}</Style.Button>
}

Question.InversedButton = function QuestionInversedButton({children, ...props}) {
    return <Style.InversedButton {...props} onClick={props.onClick} color={props.color}>{children}</Style.InversedButton>
}

Question.TernaryButton = function QuestionButton({children, ...props}) {
    return <Style.TernaryButton {...props} onClick={props.onClick}>{children}</Style.TernaryButton>
}

Question.Checkboxes = function QuestionCheckboxes({children, ...props}) {
    return <Style.Checkboxes {...props}>{children}</Style.Checkboxes>
}

Question.Checkbox = function QuestionCheckbox({children, ...props}) {
    return <Style.Checkbox type="checkbox" name={props.name} value={props.value} {...props}/>
}

Question.Break = function QuestionBreak() {
    return <Style.Break />
}

Question.HorizontalDivider = function QuestionDivider() {
    return <Style.HorizontalDivider />
}

Question.ButtonWrapper = function QuestionButtonWrapper({children, ...props}) {
    return <Style.ButtonWrapper {...props}>{children}</Style.ButtonWrapper>
}

Question.OrderedList = function QuestionOrderedList({children, ...props}) {
    return <Style.OrderedList {...props}>{children}</Style.OrderedList>
}

Question.List = function QuestionList({children, ...props}) {
    return <Style.OrderedList1 {...props}>{children}</Style.OrderedList1>
}

Question.ListItem = function QuestionListItem({children, ...props}) {
    return <Style.ListItem {...props}>{children}</Style.ListItem>
}

Question.UnderlinedCircle = function QuestionUnderlinedCircleCard() {
    return <Style.UnderlinedCirleCard/>
}

Question.LighteningCard = function QuestionLighteningCard() {
    return <Style.LighteningCard/>
}

Question.Card = function QuestionCard({children, ...props}) {
    return <Style.Card {...props}>{children}</Style.Card>
}

Question.Placeholder = function QuestionPlaceholder({children, ...props}) {
    return <Style.Placeholder {...props}>{children}</Style.Placeholder>
}
 

export default Question; 