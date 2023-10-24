import React from "react";

const MessageContent = ({ content }) => {
	return <div dangerouslySetInnerHTML={{ __html: content }} />;
};

export default MessageContent;
