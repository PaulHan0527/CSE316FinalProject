import React, { useState } from 'react';
import { REGISTER } from '../../cache/mutations';
import { useMutation } from '@apollo/client';
import { useHistory } from 'react-router-dom';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const CreateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', name: '' });
	const [loading, toggleLoading] = useState(false);
	const [Register] = useMutation(REGISTER);
	let history = useHistory();


	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleCreateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
		const { loading, error, data } = await Register({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			toggleLoading(false);
			if (data.register.email === 'already exists') {
				alert('User with that email already registered');
			}
			else {
				props.fetchUser();
				props.setShowCreate(false);
				history.push('/home/maps')
			}
			

		};
	};

	return (
		<WModal className="signup-modal" cover="true" visible={props.setShowCreate} animation='slide-fade-top'>
			<WMHeader className="modal-header" onClose={() => props.setShowCreate(false)}>
				Create A New Account
			</WMHeader>

			{
				loading ? <div />
					: <WMMain className='modal-main'>


						<WInput
							className="modal-input" onBlur={updateInput} name="name" labelAnimation="up"
							barAnimation="solid" labelText="Name" wType="outlined" inputType="text" color='white'
						/>
						<div className="modal-spacer">&nbsp;</div>
						<WInput
							className="modal-input" onBlur={updateInput} name="email" labelAnimation="up"
							barAnimation="solid" labelText="Email Address" wType="outlined" inputType="text"
						/>
						<div className="modal-spacer">&nbsp;</div>
						<WInput
							className="modal-input" onBlur={updateInput} name="password" labelAnimation="up"
							barAnimation="solid" labelText="Password" wType="outlined" inputType="password"
						/>
						<div className="modal-spacer">&nbsp;</div>

						<WRow className="modal-buttons-row">
							<WCol size='1'></WCol>
							<WCol size='4'>
								<WButton className="modal-button" onClick={handleCreateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded">
									Create Account
								</WButton>
							</WCol>

							<WCol size='2'></WCol>
							<WCol size='4'>
								<WButton className="modal-button cancel-button" onClick={() => props.setShowCreate(false)} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded">
									Cancel
								</WButton>
							</WCol>
							<WCol size='1'></WCol>
						</WRow>
					</WMMain>
			}

		</WModal>
	);
}

export default CreateAccount;
