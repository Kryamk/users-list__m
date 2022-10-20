import React, { useEffect, useRef, useState } from 'react'
import Row from './components/Row';
// import About from './pages/About';
import 'bootstrap/dist/css/bootstrap.min.css';
import './style.css';
import useStore from './hooks/useStore';
import { observer } from 'mobx-react-lite';
import ButtonTable from './components/ButtonTable';
import FormAdd from './components/FormAdd';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
// import { Button, Modal } from 'react-bootstrap';


export default observer(App);
function App() {
	console.log('render App');

	const [usersStore] = useStore('users');
	let { users, sorted, add, remove, changeChecked, changeCheckedAll, getCountChecked } = usersStore;


	const [show, setShow] = useState(false)
	const handleShow = () => { setShow(true) }
	const handleClose = () => { setShow(false) }

	const [show2, setShow2] = useState(false)
	const handleShow2 = () => { setShow2(true) }
	const handleClose2 = () => { setShow2(false) }

	const [countChecked, setCountChecked] = useState(0)
	useEffect(() => {
		setCountChecked(getCountChecked())
	}, [users])

	const sort = (e) => {
		let field = e.target.dataset.sort
		let reverse = e.target.dataset.reverse
		if (reverse === 'true') {
			e.target.dataset.reverse = 'false'
		}
		else {
			e.target.dataset.reverse = 'true'
		}
		sorted(field, reverse)
	}


	// const [disabledbuttonDel, setDisabledbuttonDel] = useState(true)

	// useEffect(() => {
	// 	let count = 0;
	// 	users.forEach(item => item.checked === true ? ++count : null)
	// 	setCountChecked(count)
	// }, [users])
	// useEffect(() => {
	// 	let count = 0;
	// 	users.forEach(item => item.checked === true ? ++count : null)
	// 	setCountChecked(count)
	// }, [users])



	const [checkInputAll, setcheckInputAll] = useState(false)
	const handleCheck = (e) => {
		changeChecked(+e.target.value, e.target.checked)
	}
	const checkedUsersAll = (e) => {
		changeCheckedAll(e.target.checked)
		setcheckInputAll(e.target.checked)
		setCountChecked(getCountChecked())
	}


	const addUser = (user) => {
		add(user)
		setShow(false)
	}
	const removeUsers = () => {
		remove()
		setcheckInputAll(false)
		handleClose2()
	};




	// useEffect(() => {
	// 	// console.log('---',list);
	// 	// let obj = list[0]
	// 	// if (obj) console.log('---list', obj.checked);
	// 	setCountChecked(getCountChecked())
	// }, [users])

	return (
		<div className="wrapper">




			<header className="header">
				<div className="filter">filter</div>
				<Button variant="danger" disabled={countChecked === 0 ? true : false} type="button" onClick={handleShow2}>Delete</Button>
				<Button variant="primary" onClick={handleShow}>+ Add user</Button>
			</header>

			<table className='users-list'>
				<tbody>
					<tr>
						<th><input checked={checkInputAll} type="checkbox" onChange={(e) => checkedUsersAll(e)}></input> All</th>
						<th><ButtonTable sortField='id' reverse='false' sorting={(e) => sort(e)}>#</ButtonTable></th>
						<th>Avatar</th>
						<th><ButtonTable sortField='name' reverse='false' sorting={(e) => sort(e)}>Name</ButtonTable></th>
						<th>Username</th>
						<th>Email</th>
						<th>Phone</th>
						<th><ButtonTable sortField='zipcode' reverse='false' sorting={(e) => sort(e)}>zipcode</ButtonTable></th>
					</tr>

					{users.map((item, i = 0) => (
						<Row key={item.id} {...item} handleCheck={handleCheck} />
					))}

				</tbody>
			</table>


			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title >Add user</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					<FormAdd add={addUser} />
				</Modal.Body>
			</Modal>

			<Modal show={show2} onHide={handleClose2}>
				<Modal.Header closeButton>
					<Modal.Title >Deleted users</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					Are you sure you want to delete the selected {countChecked} users?
				</Modal.Body>
				<Modal.Footer>
					<Button variant='success' type="button" onClick={removeUsers}>Delete</Button>
					<Button variant='secondary' type="button" onClick={handleClose2}>Cancel</Button>
				</Modal.Footer>
			</Modal>
		</div >
	);
}
