import React, { Component } from 'react';
import styled from 'styled-components';
import { Draggable } from 'react-beautiful-dnd';

const Container = styled.div`
	padding: 10px;
	border: 1px solid gray;
`;

const ImageContainer = styled.img`
	width: 100%;
`;

class ImageTile extends Component {
	render() {
		const { imageUrl, index } = this.props;

		return (

					<Draggable draggableId={`draggable-${index}`} index={index}>
						{(provided) => (
							<Container
								ref={provided.innerRef}
								{...provided.draggableProps}
								{...provided.dragHandleProps}
							>
								<ImageContainer src={imageUrl} />

							</Container>
						)}
					</Draggable>
		);
	}
}

export default ImageTile;