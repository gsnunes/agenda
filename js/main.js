var AGENDA = (function () {

	'use strict';


	return {

		init: function () {
			this.currentDate = new Date();

			this.weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
			this.month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

			this.setHeaderTitle();
			this.bindButtons();
		},



		bindButtons: function () {
			var self = this;

			document.querySelector('.btn-previous').onclick = function () {
				self.currentDate.setDate(self.currentDate.getDate() - 1);
				self.setHeaderTitle();
			};

			document.querySelector('.btn-next').onclick = function () {
				self.currentDate.setDate(self.currentDate.getDate() + 1);
				self.setHeaderTitle();
			};

			document.querySelector('.btn-now').onclick = function () {
				self.currentDate = new Date();
				self.setHeaderTitle();
			};
		},



		add: function (name, allDay, begin, end) {
			var point = document.createElement('div'),
				pointContent = document.createElement('div'),
				iconBell = document.createElement('span'),
				items = document.querySelectorAll('.point-list li'),
				currentTime = (new Date().getHours()) + 1,
				selectedItem,
				diff = 0,
				beginSplited, endSplited,
				beginHalf,
				height;

			point.className = 'point';
			pointContent.className = 'point-content';
			iconBell.className = 'sprite icon-bell';

			point.appendChild(iconBell);

			if (name) {
				pointContent.textContent = name;
				point.appendChild(pointContent);
			}

			if (allDay) {
				selectedItem = items[0];
				point.style.height = '18px';
			}
			else {
				if (typeof begin === 'undefined' || typeof end === 'undefined') {
					selectedItem = items[currentTime];
				}
				else {
					if (typeof begin === 'string') {
						beginSplited = begin.split(':');
						begin = parseInt(beginSplited[0], 10);

						if (beginSplited[1] && parseInt(beginSplited[1], 10) >= 30) {
							point.style.top = '25px';
							beginHalf = true;
						}
					}

					if (typeof end === 'string') {
						endSplited = end.split(':');
						end = parseInt(endSplited[0], 10);
					}

					selectedItem = items[(begin + 1)];

					if (end >= begin) {
						diff = end - begin;

						if (diff > 0 || (endSplited && endSplited[1])) {
							if (beginHalf) {
								height = ((diff * 50) - 25);
							}
							else {
								height = (diff * 50);
							}

							if (endSplited && endSplited[1]) {
								if (parseInt(endSplited[1], 10) > 0 && parseInt(endSplited[1], 10) <= 30) {
									height = height + 25;
								}
								else if (parseInt(endSplited[1], 10) > 30) {
									height = height + 50;
								}
							}

							point.style.height = height + 'px';
						}
					}
				}
			}

			selectedItem.appendChild(point);
			this.setPointWidth(selectedItem);

			localStorage.setItem(document.querySelector('.title').textContent, document.querySelector('.point-list').innerHTML);
		},



		setPointWidth: function (selectedItem) {
			var points = selectedItem.querySelectorAll('.point'),
				i, len = points.length;

			for (i = 0; i < len; i++) {
				points[i].style.width = (100 / len) + '%';
			}
		},



		setHeaderTitle: function () {
			var title = this.weekDay[this.currentDate.getDay()] + ', ' + this.month[this.currentDate.getMonth()] + ' ' + this.currentDate.getDate() + ', ' + this.currentDate.getFullYear();
			document.querySelector('.title').textContent = title;
			this.populate();
		},



		populate: function () {
			var data = localStorage.getItem(document.querySelector('.title').textContent);

			this.clear();

			if (data) {
				document.querySelector('.point-list').innerHTML = data;
			}
		},



		clear: function () {
			var items = document.querySelectorAll('.point-list li'),
				i, len = items.length;

			for (i = 0; i < len; i++) {
				items[i].innerHTML = '';
			}
		}

	};

}());

AGENDA.init();