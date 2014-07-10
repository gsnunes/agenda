AGENDA = (function () {
	'use strict';


	var month = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var weekDay = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];


	return {

		init: function () {
			this.currentDate = this.getDate();

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


		addPoint: function (name, allDay, begin, end) {
			var point = document.createElement('div'),
				pointContent = document.createElement('div'),
				iconBell = document.createElement('span'),
				items = document.querySelectorAll('.point-list li');

			point.className = 'point';
			pointContent.className = 'point-content';
			iconBell.className = 'sprite icon-bell';

			point.appendChild(iconBell);

			if (name) {
				pointContent.textContent = name;
				point.appendChild(pointContent);
			}

			if (allDay) {
				items[0].appendChild(point);
			}
			else {
				if (!begin || !end) {
					var currentTime = (new Date().getHours()) + 1;
					items[currentTime].appendChild(point);
				}
				else {
					items[(begin + 1)].appendChild(point);
				}
			}

			localStorage.setItem(document.querySelector('.title').textContent, document.querySelector('.point-list').innerHTML);
		},


		setHeaderTitle: function () {
			var title = weekDay[this.currentDate.getDay()] + ', ' + month[this.currentDate.getMonth()] + ' ' + this.currentDate.getDate() + ', ' + this.currentDate.getFullYear();
			document.querySelector('.title').textContent = title;
			this.populate();
		},


		populate: function () {
			var data = localStorage.getItem(document.querySelector('.title').textContent);

			this.clearData();

			if (data) {
				document.querySelector('.point-list').innerHTML = data;
			}
		},


		clearData: function () {
			var items = document.querySelectorAll('.point-list li');

			for (var i = 0, len = items.length; i < len; i++) {
				items[i].innerHTML = '';
			}
		},


		getDate: function () {
			return new Date();
		}

	};

}());

AGENDA.init();