var Imtech = {};
Imtech.Pager = function() {
    this.paragraphsPerPage = 1;
    this.currentPage = 1;
    this.pagingControlsContainer = "#pagingControls";
    this.pagingContainerPath = "#posts";

    this.numPages = function() {
        var numPages = 0;
        if (this.paragraphs != null && this.paragraphsPerPage != null) {
            numPages = Math.ceil(this.paragraphs.length / this.paragraphsPerPage);
        }

        return numPages;
    };

    this.showPage = function(page) {
        this.currentPage = page;

        var html = "";
        for (var i = (page-1)*this.paragraphsPerPage; i < ((page-1)*this.paragraphsPerPage) + this.paragraphsPerPage; i++) {
            if (i < this.paragraphs.length) {
                var elem = this.paragraphs.get(i);
                html += "<" + elem.tagName + " class='"+ elem.className + "' >" + elem.innerHTML + "</" + elem.tagName + ">";
            }
        }

        $(this.pagingContainerPath).html(html);

        var numPages = this.numPages()

        renderControls(this.pagingControlsContainer, this.currentPage, numPages);
        $(window).scrollTop(0);
    }

    var renderControls = function(container, currentPage, numPages) {
        var pagingControls = "<ul class='pagination'>";
        // for (var i = 1; i <= numPages; i++) {
        //     if (i != currentPage) {
        //         pagingControls += "<li class='page-item active'><a href='#' class='page-link' onclick='pager.showPage(" + i + "); return false;'>" + Próximo + "</a></li>";
        //     } else {
        //         pagingControls += "<li class='page-item'><span class='page-link' disabled='true'> " + Anterior + "</span></li>";
        //     }
        // }
        var next = null
        var previous = null

        if(currentPage < numPages){
          next = currentPage + 1
        } else {
          next = numPages
        }

        if(currentPage > 1){
          previous = currentPage - 1
        } else {
          previous = 1
        }

        pagingControls += "<li class='page-item '><a href='#' class='page-link' onclick='pager.showPage(" + previous + "); return false;'>" +  'Anterior' + "</a></li>";

        pagingControls += "<li class='page-item '><a href='#' class='page-link' onclick='pager.showPage(" + next + "); return false;'>" +  'Próximo' + "</a></li>";


        pagingControls += "</ul>";

        $(container).html(pagingControls);
    }
}