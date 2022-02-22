import classes from './MessageBubble.module.css';

export const MessageBubble = (props) => {
	return (
		<div className={classes.message}>
			{props.message}
		</div>
	)
}

export default MessageBubble;