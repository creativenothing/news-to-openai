const ModalFooter = props => {
	return (
		<div
			style={{
				display: "flex",
				justifyContent: "space-around",
				marginTop: "3rem",
				paddingTop: "1rem",
				borderTop: "1px solid grey"
			}}
		>
			{props.children}
		</div>
	)
}

export default ModalFooter
