import React, { useState } from 'react';
import { UPDATE_ACCOUNT } from '../../cache/mutations';
import { useMutation } from '@apollo/client';

import { WModal, WMHeader, WMMain, WMFooter, WButton, WInput, WRow, WCol } from 'wt-frontend';

const UpdateAccount = (props) => {
	const [input, setInput] = useState({ email: '', password: '', name: '', id: props.userInfo._id });
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
				alert('All fields must be filled out to update');
				return;
			}
		}
		const { loading, error, data } = await UpdateAccount({ variables: { ...input } });
		if (loading) { toggleLoading(true) };
		if (error) { return `Error: ${error.message}` };
		if (data) {
			toggleLoading(false);
			if(data.update.email === 'already exists') {
				alert('User with that email already exists')
			}
			else {
				props.fetchUser();
				props.setShowUpdate(false);
			}
			return
		}
	};


	return (
		<WModal className="update-modal" cover="true" visible={props.setShowUpdate} animation='slide-fade-top'>
			<WMHeader className="modal-header" onClose={() => props.setShowUpdate(false)}>
				Update Account Information
			</WMHeader>

			{
				loading ? <div />
					:
					<WMMain className='modal-main'>

						<WInput
							className="modal-input" onBlur={updateInput} name="name" wType="outlined" labelText = 'Name' labelAnimation='fixed' placeholderText={props.userInfo.name} barAnimation='border-highlight' inputType="text"
						/>
						<div className="modal-spacer">&nbsp;</div>
						<WInput
							className="modal-input" onBlur={updateInput} name="email" wType="outlined" labelText = 'Email' labelAnimation='fixed' placeholderText={props.userInfo.email} barAnimation='border-highlight' inputType="text"
						/>
						<div className="modal-spacer">&nbsp;</div>
						<WInput
							className="modal-input" onBlur={updateInput} name="password" wType="outlined" labelText = 'Password' labelAnimation='fixed' barAnimation='border-highlight' inputType="password"
						/>
						<div className="modal-spacer">&nbsp;</div>

						<WRow className="modal-buttons-row">
							<WCol size='1.5'></WCol>
							<WCol size='4'>
								<WButton className="modal-button" onClick={handleUpdateAccount} span clickAnimation="ripple-light" hoverAnimation="darken" shape="rounded">
									Update
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
