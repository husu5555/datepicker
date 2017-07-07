(function() {
    var datepicker = {};
    datepicker.getMonthDay = function(year, month) {
        var ret = [];
        var nowMonthFirst = new Date(year, month - 1, 1),
            nowMonthFirstWeekday = nowMonthFirst.getDay(),
            nowMonthLast = new Date(year, month, 0),
            nowMonthLastDate = nowMonthLast.getDate(),
            lastMonthLast = new Date(year, month - 1, 0),
            lastMonthLastDate = nowMonthLast.getDate(),
            i, date, showDate;
        for (i = 0; i < 7 * 6; i++) {
            var date = i - nowMonthFirstWeekday + 1;
            if (date <= 0) {
                showDate = date + lastMonthLastDate;
                currentMonth = month - 1;
            } else if (date <= nowMonthLastDate) {
                showDate = date;
                currentMonth = month;
            } else {
                showDate = date - nowMonthLastDate;
                currentMonth = month + 1;
            }
            ret.push({
                date: date,
                showDate: showDate,
                month: currentMonth
            });
        }
        return {
            year: year,
            month: month,
            ret: ret
        };
    };
    datepicker.render = function(year, month) {
        var date = datepicker.getMonthDay(year, month),
            dateArray = date.ret,
            dateYearMonth = date.year + '年' + date.month + '月';
        var html = '<table><div class="ui-datepicker-header">' +
            '<div class="float-left ui-datepicker-prev-btn">&lt;</div>' +
            '<div class="float-left ui-datepicker-header-month">' + dateYearMonth + '</div>' +
            '<div class="float-right ui-datepicker-next-btn">&gt;</div>' +
            '</div>' +
            '<div class="ui-datepicker-content">' +
            '<table class="ui-datepicker-table">' +
            '<thead>' +
            '<tr>' +
            '<td>日</td>' +
            '<td>一</td>' +
            '<td>二</td>' +
            '<td>三</td>' +
            '<td>四</td>' +
            '<td>五</td>' +
            '<td>六</td>' +
            '</tr>' +
            '</thead>';
        var i, j, tbody = "";
        var weeks = dateArray.length / 7;
        for (i = 0; i < weeks; i++) {
            var weekdate = i * 7;
            tbody += '<tr>';
            for (j = 0; j < 7; j++) {
                var dateMonth = dateArray[i * 7 + j].month;
                var showDate = dateArray[i * 7 + j].showDate;
                tbody += '<td data-month =' + dateMonth + '>' + showDate + '</td>';
            }
            tbody += '</tr>';
        }
        html += "<tbody>" + tbody + "<tbody></table>";
        return html;

    }
    datepicker.init = function($dom, year, month) {
        if (typeof(year) === "undefined" || typeof(month) === "undefinded") {
            var today = new Date();
            year = today.getFullYear();
            month = today.getMonth() + 1;
        }
        if (!month) {
            year -= 1;
            month = 12;
        } else if (month > 12) {
            year += 1;
            month -= 12;
        }
        var html = datepicker.render(year, month);
        $($dom).append(html);
        $(document).on("click", function(ev) {
            var event = event || window.event;
            var target = event.target;
            if ($(target).is(".ui-datepicker-prev-btn")) {
                $($dom).html(" ");
                $($dom).html(datepicker.init($dom, year, month - 1));
            } else if ($(target).is(".ui-datepicker-next-btn")) {
                $($dom).html(" ");
                $($dom).html(datepicker.init($dom, year, month + 1));
            }
            var chooseMonth = $(target).attr("data-month");
            if (typeof(chooseMonth) !== "undefined") {
                $(".ui-datepicker-input").val(year + "-" + $(target).attr("data-month") + "-" + $(target).html());
            }
        });

    };
    window.datepicker = datepicker;
})();