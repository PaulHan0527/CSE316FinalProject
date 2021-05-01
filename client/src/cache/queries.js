import { gql } from "@apollo/client";

export const GET_DB_USER = gql`
	query GetDBUser {
		getCurrentUser {
			_id
			name
			email
		}
	}
`;

export const GET_DB_REGIONS = gql`
	query GetDBRegions {
		getRootRegions {
			_id
			name
			capital
			leader
			landmarks
			parentId
			owner
			rootRegion
		}
	}

`

// export const GET_DB_TODOS = gql`
// 	query GetDBTodos {
// 		getAllTodos {
// 			_id
// 			name
// 			owner
// 			items {
// 				_id
// 				description
// 				due_date
// 				assigned_to
// 				completed
// 			}
// 			sortRule
// 			sortDirection
// 		}
// 	}
// `;
