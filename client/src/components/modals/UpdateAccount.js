import React, { useState } from 'react';
import { UPDATE_ACCOUNT } from '../../cache/mutations';
import { useMutation } from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const UpdateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', name: '' });
	const [loading, toggleLoading] = useState(false);
	const [UpdateAccount] = useMutation(UPDATE_ACCOUNT);


	const updateInput = (e) => {
		const { name, value } = e.target;
		const updated = { ...input, [name]: value };
		setInput(updated);
	};

	const handleUpdateAccount = async (e) => {
		for (let field in input) {
			if (!input[field]) {
				alert('All fields must be filled out to register');
				return;
			}
		}
		const { loading, error, data } = await UpdateAccount({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			toggleLoading(false);
			if (data.register.email === 'already exists') {
				alert('User with that email already registered');
			}
			else {
				props.fetchUser();
			}
			props.setShowUpdate(false);

		};
	};

	return (
		<WModal className="signup-modal" cover="true" visible={props.setShowUpdate} animation='slide-fade-top'>
			<WMHeader className="modal-header" onClose={() => props.setShowUpdate(false)}>
				Update Account Information
			</WMHeader>

			{
				loading ? <div />
					: <WMMain className='modal-main'>

						<WInput
							className="modal-input" onBlur={updateInput} name="name" labelAnimation="up"
							barAnimation="solid" labelText="Name" wType="outlined" inputType="text"
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
						<WRow className="modal-buttons-row">
							<WCol size='1.5'></WCol>
							<WCol size='4'>
								<WButton className="modal-button" onClick={handleUpdateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded">
									Update Account
								</WButton>
							</WCol>

							<WCol size='1'></WCol>
							<WCol size='4'>
								<WButton className="modal-button cancel-button" onClick={() => props.setShowUpdate(false)} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded">
									Cancel
								</WButton>
							</WCol>
							<WCol size='1.5'></WCol>
						</WRow>
					</WMMain>
			}
		</WModal>
	);
}

export default UpdateAccount;
