(() => {

	// Your web app's Firebase configuration
	// For Firebase JS SDK v7.20.0 and later, measurementId is optional
	var firebaseConfig = {
		apiKey: "AIzaSyA6t2KFvq8CPqODbganhC-6x11fnDYrYLw",
		authDomain: "shaida-solar.firebaseapp.com",
		projectId: "shaida-solar",
		storageBucket: "shaida-solar.appspot.com",
		messagingSenderId: "730970288565",
		appId: "1:730970288565:web:1354c27f43576d90eb69fc",
		measurementId: "G-3KWRTGYRYJ",
		databaseURL: "https://shaida-solar-default-rtdb.firebaseio.com/",
		storageBucket: "gs://shaida-solar.appspot.com/"
	};

	// Initialize Firebase
	firebase.initializeApp(firebaseConfig);
	firebase.analytics();

	const db = firebase.database();
	const storage = firebase.storage();
	const reviews = db.ref('reviews');
	let MainToken = undefined, allImgesSent = false;

	// const arr = [];
	// storage.ref('gallery').listAll()
	// 	.then(res => {
	// 		res.items.forEach(it => {
	// 			arr.push(it.fullPath);
	// 		});
	// 	})
	// 	.catch(err => {
	// 		console.log(err);
	// 	})
	// 	.finally(() => console.log(arr));

	// gallery.push().set({
	// 	img: true
	// }).then(res => console.log(res));

	// reviews.once('value', (snapshot) => {
	// 	snapshot.forEach((childSnapshot) => {
	// 		var childKey = childSnapshot.key;
	// 		var childData = childSnapshot.val();
	// 		console.log(childKey, childData);
	// 	});
	// });

	// console.log('----------------------------------------------');
	// console.log('Developer: Nikhil Salonia');
	// console.log('fiverr: https://www.fiverr.com/nikhilsalonia');
	// console.log('----------------------------------------------');

	const UI = (() => {

		let isAdmin = false;

		const DB_URL = 'https://shaidasolar-2f20.restdb.io/rest';
		const DB_KEY = '6041bdb7acc40f765fede426';

		const $one = (selector) => document.querySelector(selector);
		const $ = (selector) => document.querySelectorAll(selector);

		// Header
		const initHeader = function () {
			const header = $one('header');

			if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
				header.classList.add('scrolled');
			} else {
				header.classList.remove('scrolled');
			}

			window.addEventListener('scroll', (e) => {
				if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
					header.classList.add('scrolled');
				} else {
					header.classList.remove('scrolled');
				}
			});

			const menu = $one('header .menu');
			const menuBtn = $one('header .menu-icon');
			const menuIcon = $one('header .menu-icon ion-icon');
			let menuOpen = false;

			menuBtn.addEventListener('click', () => {

				if (menuOpen) {
					document.body.style.overflow = 'auto';
					menuIcon.setAttribute('name', 'menu');
					menu.classList.remove('menu-open');
					menuOpen = false;
				} else {
					document.body.style.overflow = 'hidden';
					menuIcon.setAttribute('name', 'close');
					menu.classList.add('menu-open');
					menuOpen = true;
				}

			});
		};

		// Forms
		const sendMail = function (props) {
			const html = `
		<h1 style="text-align: center"><b>-NEW FORM-</b><br><b>SHAIDA SOLAR ENERGY</b></h1>
		<br>
		<p><b>Name</b>: ${props.name}</p>
		<p><b>Email</b>: ${props.email}</p>
		<p><b>Number</b>: ${props.number}</p>
		<p><b>Zip</b>: ${props.zip}</p>
		<p>${props.message.replace(/\n/g, '<br>')}</p>
		`;

			const body = {
				to: 'getsolarlv@gmail.com',
				sendername: props.name,
				subject: `New Form Submission from ${window.location.hostname}`,
				html: html || '-- NO DATA --'
			};

			fetch('https://shaidasolar-2f20.restdb.io/mail', {
				method: 'POST',
				headers: {
					'content-type': 'application/json',
					'cache-control': 'no-cache',
					'x-apikey': DB_KEY
				},
				body: JSON.stringify(body),
			}).catch(err => console.log(err));
		}

		const cleanInput = function (props) {
			props.name.value = '';
			props.email.value = '';
			props.number.value = '';
			props.zip.value = '';
			props.message.value = '';
		}

		const initPopupForm = function () {
			const contactBtn = $one('footer .btn');
			const close = $one('.popup-contact .close');
			const popup = $one('.popup-contact');

			contactBtn.addEventListener('click', () => {
				popup.classList.add('popup-active');
			});

			close.addEventListener('click', () => {
				popup.classList.remove('popup-active');
			});

			const popup_form = $one('.popup-contact form');
			const popup_btn = $one('.popup-contact form button');
			const popup_name = $one('.popup-contact form #name');
			const popup_email = $one('.popup-contact form #email');
			const popup_number = $one('.popup-contact form #number');
			const popup_zip = $one('.popup-contact form #zip');
			const popup_message = $one('.popup-contact form #message');
			let popup_enableForm = true;

			popup_form.addEventListener('submit', (e) => {

				e.preventDefault();

				if (!popup_enableForm) return;

				if (!popup_name || !popup_email || !popup_number || !popup_zip) return;

				sendMail({
					name: popup_name.value,
					email: popup_email.value,
					number: popup_number.value,
					zip: popup_zip.value,
					message: popup_message.value
				});

				cleanInput({
					name: popup_name,
					email: popup_email,
					number: popup_number,
					zip: popup_zip,
					message: popup_message
				});

				popup_btn.textContent = 'Submitted';
				popup_btn.classList.add('submitted');

				popup_enableForm = false;

				setTimeout(() => {
					popup_enableForm = true;
					popup_btn.textContent = 'GET QUOTE';
					popup_btn.classList.remove('submitted');
				}, 10 * 1000);

			});
		}

		const initForm = function () {
			const form = $one('form');
			const btn = $one('form button');
			const name = $one('form #name');
			const email = $one('form #email');
			const number = $one('form #number');
			const zip = $one('form #zip');
			const message = $one('form #message');
			let enableForm = true;

			form.addEventListener('submit', (e) => {

				e.preventDefault();

				if (!enableForm) return;

				if (!name || !email || !number || !zip) return;

				sendMail({
					name: name.value,
					email: email.value,
					number: number.value,
					zip: zip.value,
					message: message.value
				});

				cleanInput({
					name,
					email,
					number,
					zip,
					message
				});

				btn.textContent = 'Submitted';
				btn.classList.add('submitted');

				enableForm = false;

				setTimeout(() => {
					enableForm = true;
					btn.textContent = 'GET QUOTE';
					btn.classList.remove('submitted');
				}, 10 * 1000);

			});
		}

		// Steps
		const initSteps = function () {
			const stepCon = $one('.section-steps .text-box');
			const steps = $('.section-steps .step');
			const boxs = $('.section-steps .right-box .box');

			stepCon.addEventListener('click', e => {
				const el = e.target.closest('.step');

				if (!el) return;

				const stepN = +el.dataset.step;

				steps.forEach(step => {
					step.classList.remove('active');
				});

				steps[stepN - 1].classList.add('active');

				boxs.forEach(box => {
					box.classList.remove('active-box');
				});

				boxs[stepN - 1].classList.add('active-box');
			});
		}

		// Gallery Dom
		const galleryDOM = {
			container: undefined,
			spinner: undefined,
			spinnerIcon: undefined,
			columns: undefined,
			page: 0,
			loading: false,
			spinnerOn: undefined,
			spinnerOff: undefined,
			imageShow: undefined,
			showImage: undefined,
			closeShowBtn: undefined,
			currColumn: 0
		};

		const initGallery = function () {

			galleryDOM.container = $one('.section-gallery .container');
			galleryDOM.spinner = $one('.section-gallery .show-more');
			galleryDOM.spinnerIcon = $one('.section-gallery .show-more ion-icon');
			galleryDOM.columns = $('.section-gallery .column');
			galleryDOM.closeShowBtn = $one('.section-gallery .image-show ion-icon');
			galleryDOM.imageShow = $one('.section-gallery .image-show');
			galleryDOM.showImage = $one('.section-gallery .image-show img');

			galleryDOM.spinnerOn = function () {
				galleryDOM.spinnerIcon.setAttribute('name', 'git-commit-outline');
				galleryDOM.spinner.classList.add('rotate');
				galleryDOM.loading = true;
			};

			galleryDOM.spinnerOff = function () {
				galleryDOM.spinnerIcon.setAttribute('name', 'arrow-down-outline');
				galleryDOM.spinner.classList.remove('rotate');
				galleryDOM.loading = false;
			};

			galleryDOM.closeShowBtn.addEventListener('click', () => {
				galleryDOM.imageShow.classList.remove('visible');
			});

			galleryDOM.imageShow.addEventListener('click', e => {

				const click = e.target.closest('div');

				if (!click.classList.contains('image-show')) return;

				galleryDOM.imageShow.classList.remove('visible');

			});

			galleryDOM.container.addEventListener('click', e => {

				const img = e.target.closest('img');

				if (!img) return;

				galleryDOM.showImage.src = img.src;

				galleryDOM.imageShow.classList.add('visible');

			});

		};

		const insertImagesGallery = function (images) {

			let html;

			images.forEach((img) => {

				let i = galleryDOM.currColumn;

				html = `
			<div class="image">
				<img src="${img.url}" alt="img">
			</div>
			`;

				if (i % 6 === 0) {
					galleryDOM.columns[0].insertAdjacentHTML('beforeend', html);
				} else if (i % 6 === 1) {
					galleryDOM.columns[1].insertAdjacentHTML('beforeend', html);
				} else if (i % 6 === 2) {
					galleryDOM.columns[2].insertAdjacentHTML('beforeend', html);
				} else if (i % 6 === 3) {
					galleryDOM.columns[3].insertAdjacentHTML('beforeend', html);
				} else if (i % 6 === 4) {
					galleryDOM.columns[4].insertAdjacentHTML('beforeend', html);
				} else {
					galleryDOM.columns[5].insertAdjacentHTML('beforeend', html);
				}

				galleryDOM.currColumn++;

			});

			// console.log(galleryDOM.currColumn);
			//
			// galleryDOM.currColumn = (galleryDOM.currColumn + images.length - 1) % 6;
			//
			// console.log(galleryDOM.currColumn, images.length);

		};

		// Reviews
		const reviewsDOM = {};

		const initReviews = function () {
			reviewsDOM.slideContainer = $one('.section-reviews .container');
			reviewsDOM.leftBtn = $one('.left');
			reviewsDOM.rightBtn = $one('.right');
			reviewsDOM.slides = $('.slide');
			reviewsDOM.currSlide = 0;

			const goToSlide = n => {
				reviewsDOM.slides.forEach(slide => {
					slide.classList.remove('active');
				});
				reviewsDOM.slides[n].classList.add('active');
			};

			reviewsDOM.leftBtn.addEventListener('click', () => {
				reviewsDOM.currSlide--;
				if (reviewsDOM.currSlide < 0) reviewsDOM.currSlide = reviewsDOM.slides.length - 1;
				goToSlide(reviewsDOM.currSlide);
			});

			reviewsDOM.rightBtn.addEventListener('click', () => {
				reviewsDOM.currSlide++;
				if (reviewsDOM.currSlide > reviewsDOM.slides.length - 1) reviewsDOM.currSlide = 0;
				goToSlide(reviewsDOM.currSlide);
			});
		};

		const insertReviews = function (reviews) {
			reviews.forEach(review => {
				const html = `
			<div class="slide">
				<p class="rating">${"<ion-icon name='star'></ion-icon>".repeat(+review.rating)}</p>
				<p class="body">${review.review.replace(/\n/g, '<br>')}</p>
				<p class="author"> - ${review.name}</p>
			</div>
			`;
				reviewsDOM.slideContainer.insertAdjacentHTML('beforeend', html);
			});

			reviewsDOM.slides = $('.slide');
		};

		// Section Reviews Admin
		const adminDOM = {
			reviewAdminForm: undefined,
			reviewsContainerAdminOpenBtn: undefined,
			reviewsContainerAdmin: undefined,
			reviewsPage: 0,
			reviewsContainerAdminOpen: undefined,
			galleryAdminForm: undefined,
			galleryContainerAdminOpenBtn: undefined,
			galleryContainerAdmin: undefined,
			galleryPage: 0,
			galleryContainerAdminOpen: undefined,
			loadingReviews: true,
			loadingReviewsOn: undefined,
			loadingReviewsOff: undefined,
			loadingGallery: true,
			loadingImagesOn: undefined,
			loadingImagesOff: undefined,
			adminPassForm: undefined,
			adminPassSection: undefined
		};

		const initAdmin = function () {

			adminDOM.adminPassForm = $one('.admin-pass form');
			adminDOM.adminPassSection = $one('.admin-pass');

			adminDOM.reviewAdminForm = $one('.section-admin-reviews form');
			adminDOM.reviewsContainerAdminOpenBtn = $one('.section-admin-reviews ion-icon');
			adminDOM.reviewsContainerAdmin = $one('.section-admin-reviews .reviews-container');
			adminDOM.reviewsContainerAdminOpen = false;

			adminDOM.loadingReviewsOn = function () {
				const loader = $one('.section-admin-reviews .load-reviews');
				loader.classList.add('loading');
				loader.innerHTML = 'LOADING ...';
				adminDOM.loadingReviews = true;
			};

			adminDOM.loadingReviewsOff = function () {
				const loader = $one('.section-admin-reviews .load-reviews');
				loader.classList.remove('loading');
				loader.innerHTML = 'LOAD MORE';
				adminDOM.loadingReviews = false;
				loader.remove();
			};

			adminDOM.loadingImagesOn = function () {
				const loader = $one('.section-admin-gallery .load-images');
				loader.classList.add('loading');
				loader.innerHTML = 'LOADING ...';
				adminDOM.loadingGallery = true;
			};

			adminDOM.loadingImagesOff = function () {
				const loader = $one('.section-admin-gallery .load-images');
				loader.classList.remove('loading');
				loader.innerHTML = 'LOAD MORE';
				adminDOM.loadingGallery = false;
				loader.remove();
			};

			adminDOM.reviewsContainerAdminOpenBtn.addEventListener('click', () => {
				if (adminDOM.reviewsContainerAdminOpen) {
					adminDOM.reviewsContainerAdmin.classList.remove('open');
					adminDOM.reviewsContainerAdminOpenBtn.setAttribute('name', 'chevron-down-outline');
					adminDOM.reviewsContainerAdminOpen = false;
				} else {
					adminDOM.reviewsContainerAdmin.classList.add('open');
					adminDOM.reviewsContainerAdminOpenBtn.setAttribute('name', 'chevron-up-outline');
					adminDOM.reviewsContainerAdminOpen = true;
				}
			});

			adminDOM.galleryAdminForm = $one('.section-admin-gallery form');
			adminDOM.galleryContainerAdminOpenBtn = $one('.section-admin-gallery ion-icon');
			adminDOM.galleryContainerAdmin = $one('.section-admin-gallery .images-container');
			adminDOM.galleryContainerAdminOpen = false;

			adminDOM.galleryContainerAdminOpenBtn.addEventListener('click', () => {
				if (adminDOM.galleryContainerAdminOpen) {
					adminDOM.galleryContainerAdmin.classList.remove('open');
					adminDOM.galleryContainerAdminOpenBtn.setAttribute('name', 'chevron-down-outline');
					adminDOM.galleryContainerAdminOpen = false;
				} else {
					adminDOM.galleryContainerAdmin.classList.add('open');
					adminDOM.galleryContainerAdminOpenBtn.setAttribute('name', 'chevron-up-outline');
					adminDOM.galleryContainerAdminOpen = true;
				}
			});

		};

		const insertReviewsAdmin = function (reviews, startIndex = 1) {

			let html;

			// adminDOM.reviewsContainerAdmin.innerHTML = '';

			reviews.forEach((review, i) => {

				html = `
			<div class="review" data-id="${review._id}">
				<p class="number">${i + startIndex}</p>
				<p class="user">User:<input type='text' class='name-input' required='true' spellcheck='false' value="${review.name}" placeholder='user name'></p>
				<p class="rating">Rating:<input type='text' class='rating-input' required='true' spellcheck='false' value="${review.rating}" placeholder='user rating'></p>
				<p class="body"><textarea name='review' class='review-input' cols="30" rows="4" required='false' spellcheck='true' placeholder='user review'>${review.review}</textarea></p>
				<div class='delete'><ion-icon name="trash-outline"></ion-icon></div>
				<div class='save'><ion-icon name="save-outline"></ion-icon></div>
			</div>
			`;

				adminDOM.reviewsContainerAdmin.insertAdjacentHTML('beforeend', html);

			});

			adminDOM.reviewsContainerAdmin.insertAdjacentHTML('beforeend', `<div class="load-reviews">LOAD MORE</div>`);

		};

		const clearReviewsAdmin = function () {

			adminDOM.reviewsContainerAdmin.querySelectorAll('.review').forEach(el => {
				el.remove();
			});

		};

		const clearGalleryAdmin = function () {

			adminDOM.galleryContainerAdmin.querySelectorAll('.image').forEach(el => {
				el.remove();
			});

		};

		const insertImagesAdmin = function (images, startIndex = 1) {

			let html;

			// adminDOM.galleryContainerAdmin.textContent = '';

			images.forEach((img, i) => {

				html = `
			<div class='image' data-id="${img._id}" data-name="${img.name}" data-path="${img.path}">
				<p class='number'>${i + startIndex}</p>
                <div class='save'>
                	<ion-icon name="save-outline"></ion-icon>
				</div>
                <div class='delete'>
                	<ion-icon name="trash-outline"></ion-icon>
				</div>
				<img src='${img.url}' alt='img'>
				<input type='file' accept='image/png, image/jpeg, image/jpg' required='true'>
			</div>
			`;

				adminDOM.galleryContainerAdmin.insertAdjacentHTML('beforeend', html);

			});

			adminDOM.galleryContainerAdmin.insertAdjacentHTML('beforeend', `<div class="load-images">LOAD MORE</div>`);

		};

		return {
			initHeader,
			initPopupForm,
			initSteps,
			initForm,
			initReviews,
			initAdmin,
			insertReviews,
			insertReviewsAdmin,
			insertImagesAdmin,
			adminDOM,
			clearReviewsAdmin,
			clearGalleryAdmin,
			galleryDOM,
			initGallery,
			insertImagesGallery
		}

	})();

	const MODEL = (() => {

		const DB_URL = 'https://shaidasolar-2f20.restdb.io/rest';
		const DB_KEY = '6041bdb7acc40f765fede426';

		const getAllReviewsFB = function () {
			return new Promise((resolve, reject) => {
				const arr = [];
				reviews.once('value', (snapshot) => {
					snapshot.forEach((childSnapshot) => {
						var childKey = childSnapshot.key;
						var childData = childSnapshot.val();
						arr.push(childData);
					});
					resolve(arr);
				});
			});
		}

		allImgesSent = false;
		const getAllImagesFB = async function (skip = 0, max = 10, token = undefined) {
			try {
				if (allImgesSent === true) throw new Error('no more images left');

				const res = await storage.ref('gallery').list({maxResults: max, pageToken: token});

				MainToken = res.nextPageToken;
				if (MainToken === null) allImgesSent = true;

				const imagesData = res.items.map(it => {
					return {
						path: it.fullPath,
						name: it.name
					}
				});

				const images = await Promise.all(imagesData.map(img => {
					return storage.ref(img.path).getDownloadURL()
						.then(url => {
							return {
								url: url,
								path: img.path,
								name: img.name
							}
						});
				}));

				// console.log(res);

				return images;

			} catch (e) {
				console.log(e);
			}
		}

		const deleteImage = async function(path) {
			try {
				const res = storage.ref(path).delete();

				return res;
			} catch (e) {
				console.log(e);
			}
		}

		const uploadImage = async function(path, file) {
			try {
				const res = storage.ref('gallery/' + path).put(file);

				return res;
			} catch (e) {
				console.log(e);
			}
		}


		// const getAllImagesFB = function (skip = 0, max = 10, token = undefined) {
		// 	return new Promise((resolve, reject) => {
		// 		if (allImgesSent === true) reject('no more images left');
		// 		const arr = [], images = [];
		// 		storage.ref('gallery').list({maxResults: max, pageToken: token})
		// 			.then(res => {
		// 				MainToken = res.nextPageToken;
		// 				if (MainToken === null) allImgesSent = true;
		// 				// console.log(MainToken);
		// 				res.items.forEach(it => {
		// 					arr.push(it.fullPath);
		// 				});
		// 			})
		// 			.then(() => {
		// 				return Promise.all(arr.map(it => {
		// 					return storage.ref(it).getDownloadURL()
		// 				}));
		// 			})
		// 			.then(data => {
		// 				resolve(data);
		// 			})
		// 			.catch(err => {
		// 				console.log(err);
		// 			});
		// 	});
		// }

		// getAllImagesFB().then(img => console.log(img));

		const fetchDB = function (path, method, body = undefined) {
			return fetch(DB_URL + path, {
				method,
				headers: {
					'content-type': 'application/json',
					'cache-control': 'no-control',
					'x-apikey': DB_KEY
				},
				body
			}).then(res => res.json()).catch(err => console.log(err));
		};

		const fetchMedia = function (path, method = 'GET', body = undefined, blob = true) {
			if (blob) {
				return fetch('https://shaidasolar-2f20.restdb.io/media/' + path, {
					method,
					headers: {
						'cache-control': 'no-control',
						'x-apikey': DB_KEY
					},
					body
				}).then(res => res.blob()).catch(err => console.log(err));
			} else {
				return fetch('https://shaidasolar-2f20.restdb.io/media/' + path, {
					method,
					headers: {
						'cache-control': 'no-control',
						'x-apikey': DB_KEY
					},
					body
				}).then(res => res.json()).catch(err => console.log(err));
			}
		}

		const getAllReviews = async function (skip = 0, max = 10) {
			try {
				return await fetchDB(`/reviews?skip=${skip}&max=${max}&h={"$orderby":{"_created": 1}}`, 'GET');
			} catch (e) {
				console.log(e);
			}
		}

		const getAllImages = async function (skip = 0, max = 10) {
			try {
				const imagesIDs = await fetchDB(`/gallery?skip=${skip}&max=${max}&h={"$orderby":{"_created": 1}}`, 'GET');

				const images = await Promise.all(imagesIDs.map(img => fetchMedia(img.image[0])));

				return images.map((img, i) => {
					return {
						url: URL.createObjectURL(img),
						_id: imagesIDs[i]._id,
						mediaID: imagesIDs[i].image[0]
					}
				});
			} catch (e) {
				console.log(e);
			}
		}

		return {
			getAllReviews,
			getAllImages,
			fetchDB,
			fetchMedia,
			getAllReviewsFB,
			getAllImagesFB,
			deleteImage,
			uploadImage
		}

	})();

	const CONTROLLER = ((UI, MODEL) => {

		const page = document.body.dataset.title;

		if (page === 'Home' || page === 'About' || page === 'Contact' || page === 'Gallery') {
			UI.initHeader();
			UI.initPopupForm();
		}

		if (page === 'Home' || page === 'About') {

			UI.initReviews();

			MODEL
				.getAllReviews(0, 50)
				// .getAllReviewsFB()
				.then(data => UI.insertReviews(data))
				.catch(err => console.log(err));
		}

		if (page === 'Home' || page === 'Contact') {
			UI.initForm();
			UI.initSteps();
		}

		if (page === 'Gallery') {

			UI.initGallery();

			UI.galleryDOM.spinnerOn();

			MODEL
				.getAllImagesFB(0, 12, MainToken)
				.then(data => UI.insertImagesGallery(data))
				.then(() => ++UI.galleryDOM.page)
				.catch(err => console.log(err))
				.finally(() => UI.galleryDOM.spinnerOff());

			UI.galleryDOM.spinner.addEventListener('click', e => {

				if (UI.galleryDOM.loading) return;

				e.preventDefault();

				UI.galleryDOM.spinnerOn();

				MODEL
					.getAllImagesFB(UI.galleryDOM.page * 12, 12, MainToken)
					.then(data => UI.insertImagesGallery(data))
					.then(() => ++UI.galleryDOM.page)
					.catch(err => console.log(err))
					.finally(() => UI.galleryDOM.spinnerOff());

			});

		}

		if (page === 'Admin') {

			UI.initAdmin();

			const initCoreAdmin = function () {

				UI.clearReviewsAdmin();

				UI.adminDOM.loadingReviewsOn();

				MODEL
					.getAllReviews()
					.then(data => UI.insertReviewsAdmin(data))
					.then(() => {
						++UI.adminDOM.reviewsPage;
					})
					.catch(err => console.log(err))
					.finally(() => UI.adminDOM.loadingReviewsOff());

				UI.clearGalleryAdmin();

				UI.adminDOM.loadingImagesOn();

				MODEL
					.getAllImagesFB(undefined, undefined, MainToken)
					.then(data => UI.insertImagesAdmin(data))
					.then(() => ++UI.adminDOM.galleryPage)
					.catch(err => console.log(err))
					.finally(() => UI.adminDOM.loadingImagesOff());

				UI.adminDOM.reviewAdminForm.addEventListener('submit', e => {

					e.preventDefault();

					const body = {
						name: e.target.querySelector('#name').value,
						rating: e.target.querySelector('#rating').value,
						review: e.target.querySelector('#review').value
					};

					if (!body.name || !body.rating || !body.review) return;


					UI.adminDOM.loadingReviewsOn();

					MODEL
						.fetchDB('/reviews', 'POST', JSON.stringify(body))
						.then(() => {
							return MODEL.getAllReviews(0, UI.adminDOM.reviewsPage * 10)
						})
						.then(data => {
							UI.clearReviewsAdmin();
							UI.insertReviewsAdmin(data);
						})
						.catch(err => console.log(err))
						.finally(() => UI.adminDOM.loadingReviewsOff());

				});

				UI.adminDOM.reviewsContainerAdmin.addEventListener('click', e => {

					const clickedBtn = e.target.closest('div');

					let action;

					if (clickedBtn.classList.contains('delete')) {
						action = 'DELETE';
					} else if (clickedBtn.classList.contains('save')) {
						action = 'PUT';
					} else if (clickedBtn.classList.contains('load-reviews')) {

						if (UI.adminDOM.loadingReviews) return;

						UI.adminDOM.loadingReviewsOn();

						MODEL
							.getAllReviews(UI.adminDOM.reviewsPage * 10)
							.then(data => UI.insertReviewsAdmin(data, (UI.adminDOM.reviewsPage * 10) + 1))
							.then(() => {
								++UI.adminDOM.reviewsPage;
							})
							.catch(err => console.log(err))
							.finally(() => UI.adminDOM.loadingReviewsOff());

						return;

					} else {
						return;
					}

					const review = clickedBtn.closest('.review');

					if (!review) return;

					if (action === 'DELETE') {

						UI.adminDOM.loadingReviewsOn();

						MODEL
							.fetchDB(`/reviews/${review.dataset.id}`, 'DELETE')
							.then(() => MODEL.getAllReviews(0, UI.adminDOM.reviewsPage * 10))
							.then(data => {
								UI.clearReviewsAdmin();
								UI.insertReviewsAdmin(data);
							})
							.catch(err => console.log(err))
							.finally(() => UI.adminDOM.loadingReviewsOff());

					} else if (action === 'PUT') {

						const body = JSON.stringify({
							name: review.querySelector('.name-input').value,
							rating: review.querySelector('.rating-input').value,
							review: review.querySelector('.review-input').value
						});

						UI.adminDOM.loadingReviewsOn();

						MODEL
							.fetchDB(`/reviews/${review.dataset.id}`, 'PUT', body)
							.then(() => MODEL.getAllReviews(0, UI.adminDOM.reviewsPage * 10))
							.then(data => {
								UI.clearReviewsAdmin();
								UI.insertReviewsAdmin(data);
							})
							.catch(err => console.log(err))
							.finally(() => UI.adminDOM.loadingReviewsOff());
					}

				});

				UI.adminDOM.galleryAdminForm.addEventListener('submit', e => {

					e.preventDefault();

					const file = e.target.querySelector('#file').files[0];

					if (!file) return;

					// const formData = new FormData();

					// formData.append('myfile', file, file.name);

					UI.adminDOM.loadingImagesOn();

					MODEL
						.uploadImage(file.name, file)
						.then(() => {
							MainToken = undefined;
							allImgesSent = false;
						})
						.then(() => MODEL.getAllImagesFB(0, UI.adminDOM.galleryPage * 10), MainToken)
						.then(data => {
							UI.clearGalleryAdmin();
							UI.insertImagesAdmin(data);
						})
						.catch(err => console.log(err))
						.finally(() => UI.adminDOM.loadingImagesOff());

					// MODEL
					// 	.fetchMedia('', 'POST', formData, false)
					// 	.then(res => {
					// 		const body = {
					// 			image: [res.ids[0]]
					// 		};
					// 		return MODEL.fetchDB('/gallery', 'POST', JSON.stringify(body));
					// 	})
					// 	.then(() => MODEL.getAllImages(0, UI.adminDOM.galleryPage * 10))
					// 	.then(data => {
					// 		UI.clearGalleryAdmin();
					// 		UI.insertImagesAdmin(data);
					// 	})
					// 	.catch(err => console.log(err))
					// 	.finally(() => UI.adminDOM.loadingImagesOff());

				});

				UI.adminDOM.galleryContainerAdmin.addEventListener('click', e => {

					const clickedBtn = e.target.closest('div');

					let action;

					if (clickedBtn.classList.contains('delete')) {
						action = 'DELETE';
					} else if (clickedBtn.classList.contains('save')) {
						action = 'GET';
					} else if (clickedBtn.classList.contains('load-images')) {

						if (UI.adminDOM.loadingGallery) return;

						UI.adminDOM.loadingImagesOn();

						MODEL
							.getAllImagesFB(UI.adminDOM.galleryPage * 10, undefined, MainToken)
							// .getAllImages(UI.adminDOM.galleryPage * 10)
							.then(data => UI.insertImagesAdmin(data, (UI.adminDOM.galleryPage * 10) + 1))
							.then(() => ++UI.adminDOM.galleryPage)
							.catch(err => console.log(err))
							.finally(() => UI.adminDOM.loadingImagesOff());

						return;

					} else {
						return;
					}

					const image = clickedBtn.closest('.image');

					if (!image) return;

					if (action === 'DELETE') {

						UI.adminDOM.loadingImagesOn();

						MODEL
							.deleteImage(image.dataset.path)
							.then(() => {
								MainToken = undefined;
								allImgesSent = false;
							})
							.then(() => MODEL.getAllImagesFB(0, UI.adminDOM.galleryPage * 10), MainToken)
							.then(data => {
								UI.clearGalleryAdmin();
								UI.insertImagesAdmin(data);
							})
							.catch(err => console.log(err))
							.finally(() => UI.adminDOM.loadingImagesOff());

						// MODEL
						// 	.fetchDB(`/gallery/${image.dataset.id}`, 'DELETE')
						// 	.then(() => MODEL.fetchMedia(`${image.dataset.media}`, 'DELETE'))
						// 	.then(() => MODEL.getAllImages(0, UI.adminDOM.galleryPage * 10))
						// 	.then(data => {
						// 		UI.clearGalleryAdmin();
						// 		UI.insertImagesAdmin(data);
						// 	})
						// 	.catch(err => console.log(err))
						// 	.finally(() => UI.adminDOM.loadingImagesOff());
					} else if (action === 'GET') {

						const file = image.querySelector('input').files[0];

						if (!file) return;

						// const formData = new FormData();

						// formData.append('myfile', file, file.name);

						UI.adminDOM.loadingImagesOn();

						MODEL
							.uploadImage(image.dataset.name, file)
							.then(() => {
								MainToken = undefined;
								allImgesSent = false;
							})
							.then(() => MODEL.getAllImagesFB(0, UI.adminDOM.galleryPage * 10), MainToken)
							.then(data => {
								UI.clearGalleryAdmin();
								UI.insertImagesAdmin(data);
							})
							.catch(err => console.log(err))
							.finally(() => UI.adminDOM.loadingImagesOff());

						// MODEL
						// 	.fetchMedia('', 'POST', formData, false)
						// 	.then(res => {
						// 		const body = {
						// 			image: [res.ids[0]]
						// 		};
						// 		return MODEL.fetchDB(`/gallery/${image.dataset.id}`, 'PUT', JSON.stringify(body));
						// 	})
						// 	.then(() => MODEL.fetchMedia(`${image.dataset.media}`, 'DELETE'))
						// 	.then(() => MODEL.getAllImages(0, UI.adminDOM.galleryPage * 10))
						// 	.then(data => {
						// 		UI.clearGalleryAdmin();
						// 		UI.insertImagesAdmin(data);
						// 	})
						// 	.catch(err => console.log(err))
						// 	.finally(() => UI.adminDOM.loadingImagesOff());

					}

				});

			};

			UI.adminDOM.adminPassForm.addEventListener('submit', e => {

				e.preventDefault();

				const pass = e.target.querySelector('input').value;

				if (!pass) return;

				MODEL
					.fetchDB('/info?q={"property": "password"}', 'GET')
					.then(data => {
						const password = data[0].value;
						if (pass === password) {
							UI.adminDOM.adminPassSection.classList.add('admin-pass-remove');
							initCoreAdmin();
						} else {
							UI.adminDOM.adminPassSection.classList.add('admin-pass-wrong');
						}
					})
					.catch(err => console.log(err));

			});
		}

	})(UI, MODEL);

})();
