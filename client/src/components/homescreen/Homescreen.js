import Logo from '../navbar/Logo';
import Login from '../modals/Login';
import globeImage from '../../utils/globeImage.png';

import MapPageContents from '../firstMapPage/MapPageContents'
import UpdateAccount from '../modals/UpdateAccount';
import CreateRegion from '../modals/CreateRegion';

import CreateAccount from '../modals/CreateAccount';
import NavbarOptions from '../navbar/NavbarOptions';
import * as mutations from '../../cache/mutations';
import { GET_DB_REGIONS } from '../../cache/queries';

import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { WNavbar, WSidebar, WNavItem, WCol, WRow, WButton, WInput } from 'wt-frontend';
import { WLayout, WLHeader, WLMain, WLSide, WCard, WCMedia } from 'wt-frontend';
import WLFooter from 'wt-frontend/build/components/wlayout/WLFooter';
import { useHistory } from 'react-router-dom';
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
	let history = useHistory();
	let userInfo;
	
	if (auth) {
		userInfo = props.user;
	}
	// let todolists 	= [];
	// let SidebarData = [];
	// const [sortRule, setSortRule] = useState('unsorted'); // 1 is ascending, -1 desc
	// const [activeList, setActiveList] 		= useState({});
	// const [showDelete, toggleShowDelete] 	= useState(false);
	const [activeRegion, setActiveRegion] = useState({});
	const [firstMapPage, setFirstMapPage] = useState(true);
	const [showLogin, toggleShowLogin] = useState(false);
	const [showCreate, toggleShowCreate] = useState(false);
	const [showUpdate, toggleShowUpdate] = useState(false);
	const [showCreateRegion, toggleShowCreateRegion] = useState(false);
	
	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);

	let rootRegions = [];
	let rootRegionsData = [];
	if (loading) { console.log(loading, 'loading'); }
	if (error) { console.log(error, 'error'); }
	if (data) {
		rootRegions = data.getRootRegions;
		for(let root of rootRegions) {
			rootRegionsData.push({_id: root._id, name: root.name})
		}
	}

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
	const reloadRegion = async () => {
		if (auth) {
			console.log('reload region called')		
		}
	}

	// const loadTodoList = (list) => {
	// 	props.tps.clearAllTransactions();
	// 	setCanUndo(props.tps.hasTransactionToUndo());
	// 	setCanRedo(props.tps.hasTransactionToRedo());
	// 	setActiveList(list);

	// }

	const mutationOptions = {
		refetchQueries: [{ query: GET_DB_REGIONS }], 
		awaitRefetchQueries: true,
		onCompleted: () => reloadRegion()
	}

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
	const [AddRegion] = useMutation(mutations.ADD_REGION);
	const [DeleteRegion] = useMutation(mutations.DELETE_REGION);

	const createNewRootRegion = async (name) => {
		let region = {
			_id: '',
			name: name,
			capital: '',
			leader: '',
			landmarks: [],
			parentId: 'root',
			owner: props.user._id,
			rootRegion: true
		}
		const { data } = await AddRegion({ variables: { region: region }, refetchQueries: [{ query: GET_DB_REGIONS }] });
		if (data) {
			
			console.log(data);
			// load it and go to region spreadsheet
			// loadRegion(data.addRegion);
		}
	}

	const updateRootRegion = async () => {
		
	}

	const deleteRootRegion = async (_id) => {
		const { data } = await DeleteRegion({ variables: {_id: _id}, refetchQueries: [{ query: GET_DB_REGIONS }] });
		if(data) {
			refetch();
		}	
	}
	


	const setShowLogin = () => {		
		toggleShowCreate(false);
		toggleShowUpdate(false);
		toggleShowCreateRegion(false);
		toggleShowLogin(!showLogin);
	};

	const setShowCreate = () => {		
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowCreateRegion(false);
		toggleShowCreate(!showCreate);
	};

	const setShowUpdate = () => {
		toggleShowCreate(false);		
		toggleShowLogin(false);
		toggleShowCreateRegion(false);
		toggleShowUpdate(!showUpdate);
	}

	const setShowCreateRegion = () => {
		toggleShowCreate(false);		
		toggleShowLogin(false);
		toggleShowUpdate(false);
		toggleShowCreateRegion(!showCreateRegion);
	}

	let name = "";
	if (auth) {
		name = userInfo.name;
	}

	return (
		<BrowserRouter>
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
						<Redirect exact from='/home' to={{ pathname: '/home/maps' }} />
						:
						<Redirect exact from='/home' to={{ pathname: '/home' }} />
				}
				<Switch>
					<Route
						exact path='/home'
						name='welcome'
						render={() =>
							<div className="container-secondary">
								<WLMain className='globeImage'>
									<WRow>
										<WCol size='12'>
											<img src={globeImage} />
										</WCol>
									</WRow>
									<div className="modal-spacer">&nbsp;</div>
									<div className="modal-spacer">&nbsp;</div>
									<WRow>
										<WCol size='12' className='welcome-text'>
											Welcome To The World Data Mapper
							</WCol>

									</WRow>
								</WLMain>
							</div>

						}
					/>

					{/* <Route path='/home/maps/spreadsheet'/> */}

					<Route
						exact path='/home/maps'
						name='maps'
						render={() =>
							<div className="container-secondary">
								<WLMain className="firstMapPage">
									<WLayout wLayout='header-footer'>
										<WLHeader className='firstMapPageHeader'>
											{name}'s maps
										</WLHeader>
										<WRow>
											<WCol size='6'>
												<MapPageContents
													userInfo={userInfo}
													reloadRegions={refetch}
													auth={auth}
													rootRegionsData={rootRegionsData}
													// setShowDelete={setShowDelete}
													deleteRootRegion={deleteRootRegion}
													
													updateRootRegion={updateRootRegion}

												/>
											</WCol>
											<WCol size='6'>
												<img src={globeImage} />
											</WCol>
										</WRow>

										<WLFooter>
											<WRow>
												<WCol size='6'>
												</WCol>

												<WCol size='6'>
													<WButton className='create-button' onClick={() => { setShowCreateRegion() }}>Create New Map</WButton>
												</WCol>
											</WRow>
										</WLFooter>
									</WLayout>
								</WLMain>
							</div>
						}
					/>
				</Switch>

				{
					showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate}  />)
				}

				{
					showLogin && (<Login fetchUser={props.fetchUser} setShowLogin={setShowLogin} reloadRegions={refetch} />)
				}

				{
					showUpdate && (<UpdateAccount userInfo={userInfo} fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} />)
				}

				{
					showCreateRegion && (<CreateRegion fetchUser={props.fetchUser} createNewRootRegion={createNewRootRegion} setShowCreateRegion={setShowCreateRegion} reloadRegions={refetch} />)
				}

			</WLayout>
		</BrowserRouter>
	);
};

export default Homescreen;