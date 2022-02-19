import classes from './MessageBubble.module.css';

export const MessageBubble = (props) => {
	console.log(props);
	return (
		<div className={classes.message}>
			{props.message}
		</div>
	)
}

export default MessageBubble;