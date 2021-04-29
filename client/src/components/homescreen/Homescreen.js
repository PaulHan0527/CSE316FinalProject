import Logo from '../navbar/Logo';
import Login from '../modals/Login';
import globeImage from '../../utils/globeImage.png';
// import Delete 							from '../modals/Delete';
import UpdateAccount from '../modals/UpdateAccount';
// import MainContents 					from '../main/MainContents';
import CreateAccount from '../modals/CreateAccount';
import NavbarOptions from '../navbar/NavbarOptions';
import * as mutations from '../../cache/mutations';
// import SidebarContents 					from '../sidebar/SidebarContents';
// import { GET_DB_TODOS } 				from '../../cache/queries';
import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { WNavbar, WSidebar, WNavItem, WCol, WRow } from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WCard, WCMedia } from 'wt-frontend';
import WLFooter from 'wt-frontend/build/components/wlayout/WLFooter';
// import { UpdateListField_Transaction, 
// 	SortItems_Transaction,
// 	UpdateListItems_Transaction, 
// 	ReorderItems_Transaction, 
// 	EditItem_Transaction } 				from '../../utils/jsTPS';

const Homescreen = (props) => {

	const keyCombination = (e, callback) => {
		if (e.key === 'z' && e.ctrlKey) {
			if (props.tps.hasTransactionToUndo()) {
				tpsUndo();
			}
		}
		else if (e.key === 'y' && e.ctrlKey) {
			if (props.tps.hasTransactionToRedo()) {
				tpsRedo();
			}
		}
	}
	document.onkeydown = keyCombination;

	const auth = props.user === null ? false : true;
	let userInfo;
	if (auth) {
		userInfo = props.user;
	}
	// let todolists 	= [];
	// let SidebarData = [];
	// const [sortRule, setSortRule] = useState('unsorted'); // 1 is ascending, -1 desc
	// const [activeList, setActiveList] 		= useState({});
	// const [showDelete, toggleShowDelete] 	= useState(false);
	const [showLogin, toggleShowLogin] = useState(false);
	const [showCreate, toggleShowCreate] = useState(false);
	const [showUpdate, toggleShowUpdate] = useState(false);
	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	// const { loading, error, data, refetch } = useQuery(GET_DB_TODOS);

	// if(loading) { console.log(loading, 'loading'); }
	// if(error) { console.log(error, 'error'); }
	// if(data) { 
	// // Assign todolists 
	// for(let todo of data.getAllTodos) {
	// 	todolists.push(todo)
	// }
	// // if a list is selected, shift it to front of todolists
	// if(activeList._id) {
	// 	let selectedListIndex = todolists.findIndex(entry => entry._id === activeList._id);
	// 	let removed = todolists.splice(selectedListIndex, 1);
	// 	todolists.unshift(removed[0]);
	// }
	// // create data for sidebar links
	// for(let todo of todolists) {
	// 	if(todo) {
	// 		SidebarData.push({_id: todo._id, name: todo.name});
	// 	}	
	// }
	// }



	// NOTE: might not need to be async
	// const reloadList = async () => {
	// 	if (activeList._id) {
	// 		let tempID = activeList._id;
	// 		let list = todolists.find(list => list._id === tempID);
	// 		setActiveList(list);
	// 	}
	// }

	// const loadTodoList = (list) => {
	// 	props.tps.clearAllTransactions();
	// 	setCanUndo(props.tps.hasTransactionToUndo());
	// 	setCanRedo(props.tps.hasTransactionToRedo());
	// 	setActiveList(list);

	// }

	// const mutationOptions = {
	// 	refetchQueries: [{ query: GET_DB_TODOS }], 
	// 	awaitRefetchQueries: true,
	// 	onCompleted: () => reloadList()
	// }

	// const [ReorderTodoItems] 		= useMutation(mutations.REORDER_ITEMS, mutationOptions);
	// const [sortTodoItems] 		= useMutation(mutations.SORT_ITEMS, mutationOptions);
	// const [UpdateTodoItemField] 	= useMutation(mutations.UPDATE_ITEM_FIELD, mutationOptions);
	// const [UpdateTodolistField] 	= useMutation(mutations.UPDATE_TODOLIST_FIELD, mutationOptions);
	// const [DeleteTodoItem] 			= useMutation(mutations.DELETE_ITEM, mutationOptions);
	// const [AddTodoItem] 			= useMutation(mutations.ADD_ITEM, mutationOptions);
	// const [AddTodolist] 			= useMutation(mutations.ADD_TODOLIST);
	// const [DeleteTodolist] 			= useMutation(mutations.DELETE_TODOLIST);



	const tpsUndo = async () => {
		const ret = await props.tps.undoTransaction();
		if (ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	const tpsRedo = async () => {
		const ret = await props.tps.doTransaction();
		if (ret) {
			setCanUndo(props.tps.hasTransactionToUndo());
			setCanRedo(props.tps.hasTransactionToRedo());
		}
	}

	// const addItem = async () => {
	// 	let list = activeList;
	// 	const items = list.items;
	// 	const newItem = {
	// 		_id: '',
	// 		description: 'No Description',
	// 		due_date: 'No Date',
	// 		assigned_to: 'No One',
	// 		completed: false
	// 	};
	// 	let opcode = 1;
	// 	let itemID = newItem._id;
	// 	let listID = activeList._id;
	// 	let transaction = new UpdateListItems_Transaction(listID, itemID, newItem, opcode, AddTodoItem, DeleteTodoItem);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();
	// };

	// const deleteItem = async (item, index) => {
	// 	let listID = activeList._id;
	// 	let itemID = item._id;
	// 	let opcode = 0;
	// 	let itemToDelete = {
	// 		_id: item._id,
	// 		description: item.description,
	// 		due_date: item.due_date,
	// 		assigned_to: item.assigned_to,
	// 		completed: item.completed
	// 	}
	// 	let transaction = new UpdateListItems_Transaction(listID, itemID, itemToDelete, opcode, AddTodoItem, DeleteTodoItem, index);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// };

	// const editItem = async (itemID, field, value, prev) => {
	// 	let flag = 0;
	// 	if (field === 'completed') flag = 1;
	// 	let listID = activeList._id;
	// 	let transaction = new EditItem_Transaction(listID, itemID, field, prev, value, flag, UpdateTodoItemField);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// };

	// const reorderItem = async (itemID, dir) => {
	// 	let listID = activeList._id;
	// 	let transaction = new ReorderItems_Transaction(listID, itemID, dir, ReorderTodoItems);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// };

	// const createNewList = async () => {
	// 	let list = {
	// 		_id: '',
	// 		name: 'Untitled',
	// 		owner: props.user._id,
	// 		items: [],
	// 		sortRule: 'task',
	// 		sortDirection: 1
	// 	}
	// 	const { data } = await AddTodolist({ variables: { todolist: list }, refetchQueries: [{ query: GET_DB_TODOS }] });
	// 	if(data) {
	// 		loadTodoList(data.addTodolist);
	// 	} 

	// };
	// const deleteList = async (_id) => {
	// 	DeleteTodolist({ variables: { _id: _id }, refetchQueries: [{ query: GET_DB_TODOS }] });
	// 	loadTodoList({});
	// };

	// const updateListField = async (_id, field, value, prev) => {
	// 	let transaction = new UpdateListField_Transaction(_id, field, prev, value, UpdateTodolistField);
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// };

	// const handleSetActive = (_id) => {
	// 	const selectedList = todolists.find(todo => todo._id === _id);
	// 	loadTodoList(selectedList);
	// };

	const setShowLogin = () => {
		// toggleShowDelete(false);
		toggleShowCreate(false);
		toggleShowUpdate(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {
		// toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowCreate(!showCreate);
	};

	// const setShowDelete = () => {
	// 	toggleShowCreate(false);
	// 	toggleShowLogin(false);
	// 	toggleShowUpdate(false);
	// 	toggleShowDelete(!showDelete);
	// };

	const setShowUpdate = () => {
		toggleShowCreate(false);
		// toggleShowDelete(false);
		toggleShowLogin(false);
		toggleShowUpdate(!showUpdate);
	}

	// const sort = (criteria) => {
	// 	let prevSortRule = sortRule;
	// 	setSortRule(criteria);
	// 	let transaction = new SortItems_Transaction(activeList._id, criteria, prevSortRule, sortTodoItems);
	// 	console.log(transaction)
	// 	props.tps.addTransaction(transaction);
	// 	tpsRedo();

	// }
	console.log(auth);

	return (
		<WLayout wLayout="header">
			<WLHeader>
				<WNavbar className="navbar">
					<ul>
						<WNavItem>
							<Logo className='logo' />
						</WNavItem>
					</ul>
					<ul>
						<NavbarOptions
							fetchUser={props.fetchUser} auth={auth}
							setShowCreate={setShowCreate} setShowLogin={setShowLogin}
							userInfo={userInfo} setShowUpdate={setShowUpdate}
						/>
					</ul>
				</WNavbar>
			</WLHeader>

			{
				auth ?

					<div className="container-secondary">
						
						<WLMain className="firstMapPage">
							<WLayout>
								<WLHeader className='firstMapPageHeader'>
									Your maps
								</WLHeader>
							</WLayout>
						</WLMain>
					</div>
					:
					<div className="container-secondary">
					<WLMain className='globeImage'>
						<WRow>
							<WCol size='12'>
							<img src={globeImage} />
							</WCol>
						</WRow>
						<WRow>
							<WCol size='12' className='welcome-text'>
							Welcome To the World Data Mapper
							</WCol>
							
						</WRow>
					</WLMain>\
					</div>
			}

			{/* <WLSide side="left">
				<WSidebar>
					{
						activeList ? 
							<SidebarContents
								listIDs={SidebarData} 				activeid={activeList._id} auth={auth}
								handleSetActive={handleSetActive} 	createNewList={createNewList}
								updateListField={updateListField} 	key={activeList._id}
							/>
							:
							<></>
					}
				</WSidebar>
			</WLSide>
			<WLMain>
				{
					auth ? 
					
							<div className="container-secondary">
								<MainContents
									addItem={addItem} 				deleteItem={deleteItem}
									editItem={editItem} 			reorderItem={reorderItem}
									setShowDelete={setShowDelete} 	undo={tpsUndo} redo={tpsRedo}
									activeList={activeList} 		setActiveList={loadTodoList}
									canUndo={canUndo} 				canRedo={canRedo}
									sort={sort}
								/>
							</div>
						:
							<div className="container-secondary" />
				}

			</WLMain> */}

			{/* {
				showDelete && (<Delete deleteList={deleteList} activeid={activeList._id} setShowDelete={setShowDelete} />)
			} */}

			{
				showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
			}

			{
				showLogin && (<Login fetchUser={props.fetchUser} setShowLogin={setShowLogin} />)
			}

			{
				showUpdate && (<UpdateAccount userInfo={userInfo} fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} />)
			}

		</WLayout>
	);
};

export default Homescreen;