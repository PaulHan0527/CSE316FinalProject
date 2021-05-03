import Logo from '../navbar/Logo';
import Path from '../navbar/Path';
import Login from '../modals/Login';
import globeImage from '../../utils/globeImage.png';

import MapPageContents from '../firstMapPage/MapPageContents';
import RegionMain from '../regionViewer/RegionMain';
import UpdateAccount from '../modals/UpdateAccount';
import CreateRegion from '../modals/CreateRegion';

import CreateAccount from '../modals/CreateAccount';
import NavbarOptions from '../navbar/NavbarOptions';

import SpreadMain from '../spreadsheet/SpreadMain';

import * as mutations from '../../cache/mutations';
import { GET_DB_REGIONS } from '../../cache/queries';

import React, { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { WNavbar, WNavItem, WCol, WRow, WButton } from 'wt-frontend';
import { WLayout, WLHeader, WLMain } from 'wt-frontend';
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
	
	const [activeRegion, setActiveRegion] = useState({});
	const [activeRegionViewer, setActiveRegionViewer] = useState({});
	const [path, setPath] = useState([]);
	const [showLogin, toggleShowLogin] = useState(false);
	const [showCreate, toggleShowCreate] = useState(false);
	const [showUpdate, toggleShowUpdate] = useState(false);
	const [showCreateRegion, toggleShowCreateRegion] = useState(false);

	const [canUndo, setCanUndo] = useState(props.tps.hasTransactionToUndo());
	const [canRedo, setCanRedo] = useState(props.tps.hasTransactionToRedo());

	const { loading, error, data, refetch } = useQuery(GET_DB_REGIONS);

	let allRegions = [];
	let rootRegions = [];
	let rootRegionsData = [];
	let currentChildRegions = [];

	if (loading) { console.log(loading, 'loading'); }
	if (error) { console.log(error, 'error'); }
	if (data) {
		allRegions = data.getAllRegions;

		rootRegions = allRegions.filter(root => root.rootRegion === true);

		for (let root of rootRegions) {
			rootRegionsData.push({ _id: root._id, name: root.name })
		}


	}
	if (activeRegion) {
		currentChildRegions = allRegions.filter(region => region.parentId === activeRegion._id)
	}



	// NOTE: might not need to be async
	// const reloadRegion = async (activeRegion) => {
	// 	if (auth) {
	// 		console.log('reload region called')
	// 		setActiveRegion({activeRegion});
	// 	}
	// }



	// const loadTodoList = (list) => {
	// 	props.tps.clearAllTransactions();
	// 	setCanUndo(props.tps.hasTransactionToUndo());
	// 	setCanRedo(props.tps.hasTransactionToRedo());
	// 	setActiveList(list);

	// }

	// const mutationOptions = {
	// 	refetchQueries: [{ query: GET_DB_REGIONS }],
	// 	awaitRefetchQueries: true,
	// 	onCompleted: () => reloadRegion(activeRegion)
	// }

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
	const [UpdateRegion] = useMutation(mutations.UPDATE_REGION);



	const clickedRegion = async (_id, name) => {
		const { data } = await UpdateRegion({variables : { field:"name", value: name, _id: _id}});
		if( data) {
			refetch();
			setActiveRegion({ _id: _id, name: name });
			console.log(data);
		}
		
	}

	const createNewRootRegion = async (name) => {
		let region = {
			_id: '',
			name: name,
			capital: 'None',
			leader: 'None',
			landmarks: [],
			parentId: 'root',
			owner: props.user._id,
			rootRegion: true,
			childRegionIds: []
		}
		const { data } = await AddRegion({ variables: { region: region, updateParent_Id: "root" }, refetchQueries: [{ query: GET_DB_REGIONS }] });
		if (data) {
			setActiveRegion({ _id: data.addRegion._id, name: data.addRegion.name });
			setPath([data.addRegion.name, data.addRegion._id]);
			refetch();
			// load it and go to region spreadsheet
			// loadRegion(data.addRegion);
		}
	}

	const renameRootRegion = async (newName, _id) => {
		const { data } = await UpdateRegion({ variables: { field: "name", value: newName, _id: _id } });
		if (data) {

		}
	}

	const deleteRootRegion = async (_id) => {

		const { data } = await DeleteRegion({ variables: { _id: _id, updateParent_Id: "root" }, refetchQueries: [{ query: GET_DB_REGIONS }] });
		if (data) {

		}
	}

	const deleteRegion = async (_id, parentId) => {
		const { data } = await DeleteRegion({ variables: { _id: _id, updateParent_Id: parentId }, refetchQueries: [{ query: GET_DB_REGIONS }] });
		if (data) {

		}
	}


	const createNewRegion = async (parentId) => {
		let region = {
			_id: '',
			name: 'Name',
			capital: 'Capital',
			leader: 'Leader',
			landmarks: [],
			parentId: parentId,
			owner: props.user._id,
			rootRegion: false,
			childRegionIds: []
		}

		const { data } = await AddRegion({ variables: { region: region, updateParent_Id: parentId }, refetchQueries: [{ query: GET_DB_REGIONS }] });
		if (data) {

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
						<WRow>
							<WCol size='3'>
								<div>
									<WNavItem>
										<Logo className='logo'
											auth={auth}
											setActiveRegion={setActiveRegion}

											path={path} setPath={setPath}
										/>
									</WNavItem>
								</div>
							</WCol>

							<WCol size='6' className='navbar-path'>
								<ul>
									<WNavItem>
										<Path 
											auth={auth}
											setActiveRegion={setActiveRegion}
											path={path} setPath={setPath}
											setActiveRegionViewer={setActiveRegionViewer}
											
										/>
									</WNavItem>
								</ul>
							</WCol>

						</WRow>

						
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
						activeRegion._id ? 
							
							<Redirect exact from='/home' to={{ pathname: '/home/maps/' + activeRegion._id }} />
							:
							<Redirect from='/home' to={{ pathname: '/home/maps' }} />

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
											<WCol size='6' className="map-contents">
												<MapPageContents
													path={path}
													setPath={setPath}

													userInfo={userInfo}
													reloadRegions={refetch}
													auth={auth}
													rootRegionsData={rootRegionsData}
													// setShowDelete={setShowDelete}
													deleteRootRegion={deleteRootRegion}
													clickedRegion={clickedRegion}
													setActiveRegion={setActiveRegion}
													setActiveRegionViewer={setActiveRegionViewer}

													renameRootRegion={renameRootRegion}

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
													<WButton className='create-button' onClick={() => { setShowCreateRegion() }} hoverAnimation='lighten'>Create New Map</WButton>
												</WCol>
											</WRow>
										</WLFooter>
									</WLayout>
								</WLMain>
							</div>
						}
					/>

					<Route
						path='/home/maps/:id'
						render={() =>
							<div className="primary-container">
								<SpreadMain
									name={activeRegion.name}
									_id={activeRegion._id}
									createNewRegion={createNewRegion}
									reloadRegions={refetch}
									currentChildRegions={currentChildRegions}
									deleteRegion={deleteRegion}
									clickedRegion={clickedRegion}
									setActiveRegion={setActiveRegion}
									setActiveRegionViewer={setActiveRegionViewer}
									allRegions={allRegions}

									path={path}
									setPath={setPath}
								/>
							</div>
						}
					/>
					
					
					<Route
						path='/home/region/'
						name="region_viewer"
						render={() =>
							<div className="primary-container">
								<RegionMain 
									allRegions={allRegions}
									currentChildRegions={currentChildRegions}
									activeRegion={activeRegion}
									setActiveRegion={setActiveRegion}
									activeRegionViewer={activeRegionViewer}
									setActiveRegionViewer={setActiveRegionViewer}
								
								
								/>
							</div>
						}
					/>
				</Switch>

				{
					showCreate && (<CreateAccount fetchUser={props.fetchUser} setShowCreate={setShowCreate} />)
				}

				{
					showLogin && (<Login fetchUser={props.fetchUser} setShowLogin={setShowLogin} reloadRegions={refetch} />)
				}

				{
					showUpdate && (<UpdateAccount userInfo={userInfo} fetchUser={props.fetchUser} setShowUpdate={setShowUpdate} />)
				}

				{
					showCreateRegion && (<CreateRegion fetchUser={props.fetchUser} createNewRootRegion={createNewRootRegion}
						setShowCreateRegion={setShowCreateRegion} reloadRegions={refetch}
						setActiveRegion={setActiveRegion} />)
				}

			</WLayout>
		</BrowserRouter>
	);
};

export default Homescreen;