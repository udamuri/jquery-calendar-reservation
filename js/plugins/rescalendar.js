(function ( $ ) {
	$.fn.rescalendar = function( options ) {
		var cal_cur_date = new Date();
		// these are labels for the days of the week
		var cal_days_labels = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

		// these are human-readable month name labels, in order
		var cal_months_labels = ['January', 'February', 'March', 'April',
		                     'May', 'June', 'July', 'August', 'September',
		                     'October', 'November', 'December'];

		// these are the days of the week for each month, in order
		var cal_days_in_month = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

		var settings = $.extend({
			year:  cal_cur_date.getFullYear() ,
			month: cal_cur_date.getMonth() ,
			blockdate: [] ,
		}, options );

		return this.each(function () {
			var obj = $(this);
			var month = cal_cur_date.getMonth();
			if((!isNaN(settings.month) && settings.month !== null) && settings.month !== undefined )
			{
				if(settings.month >= 0 && settings.month <= 11 )
				{
					var month = settings.month;
				}	
			}
  			var year  = (isNaN(settings.year) || settings.year == null || settings.year == undefined) ? cal_cur_date.getFullYear() : settings.year;

  			var countmonth = month12(month, year);
			var html = '<div class="row">';
  			if(typeof countmonth == 'object')
  			{
  				for(var i=0;i<countmonth.length;i++)
  				{
  					var mth = countmonth[i][0];
  					var yer = countmonth[i][1];
  					html += createcalendar(mth, yer)
  					if((i + 1) % 3 == 0)
  					{
  						html += '<div class="clearfix calendarmargin"></div>';	
  					}
  				}
  			}

  			html += '</div>';

			obj.html(html);
		});

		function createcalendar(mymonth, myyear)
		{
			// get first day of month
			
			var year = myyear;
			var month = mymonth;
			var firstDay = new Date(year, month, 1);
			var datenow = new Date();
				datenow =  datenow.toISOString().substring(0, 10);
			var startingDay = firstDay.getDay();
			  
			// find number of days in month
			var monthLength = cal_days_in_month[month];
			  
			// compensate for leap year
			if (month == 1) { // February only!
			    if((year % 4 == 0 && year % 100 != 0) || year % 400 == 0){
			      monthLength = 29;
			    }
			}
			  
			// do the header
			var monthName = cal_months_labels[month]
			var html = '<div class="col-md-4 col-sm-12 col-xs-12">';
				html += '<table class="calendar-table">';
				html += '<tr class="calendar-header-my"><th colspan="7">';
				html +=  monthName + "&nbsp;" + year;
				html += '</th></tr>';
				html += '<tr class="calendar-header">';
				for(var i = 0; i <= 6; i++ ){
				   html += '<td class="calendar-header-day">';
				   html += cal_days_labels[i];
				   html += '</td>';
				}
				html += '</tr><tr>';

			// fill in the days
			var day = 1;
			// this loop is for is weeks (rows)
			for (var i = 0; i < 9; i++) {
			    // this loop is for weekdays (cells)
			    for (var j = 0; j <= 6; j++) 
			    { 
			    	var mydate = false;
			      	if (day <= monthLength && (i > 0 || j >= startingDay)) 
			      	{
			      		mydate = new Date(year+'-'+(month + 1)+'-'+day);
			      		mydate = mydate.toISOString().substring(0, 10);
			      	}
			      	
			      	var selecteddate = '';
			      	if(datenow === mydate)
			      	{
			      		  selecteddate = 'selected';
			      	}
			      	html += '<td class="calendar-day '+selecteddate+'">';
			      	if (day <= monthLength && (i > 0 || j >= startingDay)) 
			      	{
			        	html += day;
			        	day++;
			      	}
			      	html += '</td>';
			    }
			    // stop making rows if we've run out of days
			    if (day > monthLength) {
			      break;
			    } else {
			      html += '</tr><tr>';
			    }
			}
			html += '</tr></table></div>';

			return html;
		}

		function month12(monthstart, yearstart)
		{

			var month = monthstart;
			var year = yearstart;
			var arrData = [];
			for( var i=0;i<12;i++)
			{
				arrData.push([month, year])
				month++;
				if(month > 11)
				{
					year++;
					month = 0;
				}
			}

			return arrData;
		}
	};
}( jQuery ));