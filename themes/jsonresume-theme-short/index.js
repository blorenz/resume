var fs = require("fs");
var Handlebars = require("handlebars");

function render(resume) {

	var css = fs.readFileSync(__dirname + "/style.css", "utf-8");
	var template = fs.readFileSync(__dirname + "/resume.hbs", "utf-8");
	// var months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
	var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

	// Nicer dates
	Handlebars.registerHelper('year', function(date) {
	  var theDate = new Date(date);

	  return theDate.getFullYear();
	});

	Handlebars.registerHelper('date', function(date) {
	  var theDate = new Date(date);

	  return months[theDate.getMonth()] + ' ' + theDate.getFullYear();
	});
    Handlebars.registerHelper('dateYear', function(date) {
        var theDate = new Date(date);

        return theDate.getFullYear();
    });

	fs.writeFile('test.json', JSON.stringify(resume), function(){})

	return Handlebars.compile(template)({
		css: css,
		resume: resume
	});
}

Handlebars.registerHelper('paragraphSplit', function(plaintext) {
    var i, output = '',
        lines = plaintext.split(/\r\n|\r|\n/g);
    for (i = 0; i < lines.length; i++) {
        if(lines[i]) {
            output += '<p>' + lines[i] + '</p>';
        }
    }
    return new Handlebars.SafeString(output);
});

Handlebars.registerHelper('each_with_sort', function(array, key, reverse, opts) {
    var data, e, i, j, len, s;
    if (opts.data) {
        data = Handlebars.createFrame(opts.data);
    }


    array = array.sort(function(a, b) {
        a = a[key];
        b = b[key];
        if (a > b) {
            if (reverse)
                return -1;
            return 1;
        }
        if (a === b) {
            return 0;
        }
        if (a < b) {
            if (reverse)
                return 1;
            return -1;
        }
    });
    s = '';
    for (i = j = 0, len = array.length; j < len; i = ++j) {
        e = array[i];
        if (data) { // Support the usual @index.
            data.index = i;
        }
        s += opts.fn(e, {
            data: data
        });
    }
    return s;
});


module.exports = {
	render: render
};
