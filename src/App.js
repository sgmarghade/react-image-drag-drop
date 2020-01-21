import React, { Component } from 'react';
import styled from 'styled-components';
import { Col, Row, Switch } from 'antd';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import ImageTile from './components/ImageTile';

const Container = styled.div``;
const ListContainer = styled.div`
    padding: 10px;
`;
const rowStyle = {
	width : '100%',
	display : 'flex',
	flexFlow : 'row wrap'
};

const originalImages = ['https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg', 'https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg', 'https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg', 'https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg', 'https://s3-ap-southeast-2.amazonaws.com/images.getjarvis.com.au/9068b2bd089c037a144fc847b9967ee83dce0fe5299261a884adc3241a33604b.jpeg'];
const newImages = ['https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__340.jpg', 'https://image.shutterstock.com/image-photo/colorful-flower-on-dark-tropical-260nw-721703848.jpg', 'https://cdn.pixabay.com/photo/2015/02/24/15/41/dog-647528__340.jpg', 'https://cdn.pixabay.com/photo/2018/01/14/23/12/nature-3082832_960_720.jpg', 'https://images.pexels.com/photos/814499/pexels-photo-814499.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'];

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
			images : newImages
		};
	}

	onDragEnd = (result) => {
		console.log(result);
		const { source, destination } = result;
		if (destination === null) {
			return;
		}

		if (destination.index === source.index) {
			return;
		}
		const sourceImage = this.state.images[source.index];
		const newImages = Array.from(this.state.images);
		newImages.splice(source.index, 1);
		newImages.splice(destination.index, 0, sourceImage);

		this.setState({
			images : newImages
		});
	};

	render() {
		const { images } = this.state;

		return (
			<Container>
				<div>
					<Switch defaultChecked onChange={(checked) => {
						const setImages = checked ? newImages : originalImages;

						this.setState({
							images : setImages
						});
					}} />
				</div>
				<DragDropContext
					onDragEnd={this.onDragEnd}
				>

					<Row
						style={rowStyle}
						gutter={16}
						justify="start"
					>
						{images.map((image, index) => {
							return (
								<Col lg={6} key={index}>
									<Droppable
										droppableId={`single-column-${index}`}
										direction='horizontal'
									>
										{(provided) => (
											<ListContainer
												ref={provided.innerRef}
												{...provided.droppableProps}
											>
												<ImageTile key={index} imageUrl={image} index={index} />
												{provided.placeholder}
											</ListContainer>
										)}
									</Droppable>
								</Col>
							);
						})}
					</Row>
				</DragDropContext>
			</Container>
		);
	}
}

export default App;
