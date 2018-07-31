import React, { Component } from 'react';
import propTypes from 'prop-types';
import styled from 'styled-components';
import GoX from 'react-icons/lib/go/x';
import ModalBackDrop from '../../styled/common/Modal/BackDrop';
import ModalBody from '../../styled/common/Modal/Body';

const ModalHeader = styled.div`
	width: 100%;
	height: 35px;

	background-color: #09092b;

	display: flex;
	justify-content: flex-end;
	align-items: center;

	border-radius: 14px 14px 0 0;

	box-shadow: 0 5px 5px rgba(182, 182, 182, 0.75);

	> * {
		padding-right: 5px;
	}
`;

function Modal(WrappedComponent) {
	class Internal extends Component {
		constructor() {
			super();

			this.closeOnEscape = this.closeOnEscape.bind(this);
		}

		componentDidMount() {
			document.addEventListener('keydown', this.closeOnEscape);
		}

		closeOnEscape(e) {
			if (e.keyCode === 27) {
				this.props.closeModal();
			}
		}

		render() {
			return (
				<ModalBackDrop onClick={this.props.closeModal}>
					<ModalBody onClick={e => e.stopPropagation()}>
						<ModalHeader>
							<GoX
								color="white"
								size="30px"
								onClick={this.props.closeModal}
								id="closeModal"
							/>
						</ModalHeader>
						<WrappedComponent {...this.props} />
					</ModalBody>
				</ModalBackDrop>
			);
		}
	}

	Internal.propTypes = {
		closeModal: propTypes.func.isRequired
	};

	return Internal;
}

export default Modal;
