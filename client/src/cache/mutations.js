import { gql } from "@apollo/client";

export const LOGIN = gql`
	mutation Login($email: String!, $password: String!) {
		login(email: $email, password: $password) {
			email 
			_id
			name
			password
		}
	}
`;

export const REGISTER = gql`
	mutation Register($email: String!, $password: String!, $name: String!) {
		register(email: $email, password: $password, name: $name) {
			email
			password
			name
		}
	}
`;

export const UPDATE_ACCOUNT = gql`
	mutation Update($email: String!, $password: String!, $name: String!, $id: String!) {
		update(email: $email, password: $password, name: $name, id: $id) {
			email
			password
			name
			_id
		}
	}

`;
export const LOGOUT = gql`
	mutation Logout {
		logout 
	}
`;

export const ADD_REGION = gql`
	mutation AddRegion($region: RegionInput!, $updateParent_Id: String!, $index: Int!) {
		addRegion(region: $region, updateParent_Id: $updateParent_Id, index: $index) {
			_id
			name
			capital
			leader
			landmarks
			parentId
			owner
			rootRegion
			childRegionIds
		}
	}
`;

export const DELETE_REGION = gql`
	mutation DeleteRegion($_id: String!, $updateParent_Id: String!) {
		deleteRegion(_id: $_id, updateParent_Id: $updateParent_Id) {
			_id
			name
			capital
			leader
			landmarks
			parentId
			owner
			rootRegion
			childRegionIds
		}
	}

`;

export const UPDATE_REGION = gql`
	mutation UpdateRegion($_id: String!, $field: String!, $value: String!) {
		updateRegion(_id: $_id, field: $field, value: $value)
	}

`

export const UPDATE_REGION_ARRAY = gql`
	mutation UpdateRegionArray($_id: String!, $field: String!, $value: [String]) {
		updateRegionArray(_id: $_id, field: $field, value: $value)
	}

`

export const CHANGE_PARENT = gql`
	mutation ChangeParent($_id: String!, $oldParent_id: String!, $newParent_id: String!) {
		changeParent(_id: $_id, oldParent_id: $oldParent_id, newParent_id: $newParent_id)
	}
`
