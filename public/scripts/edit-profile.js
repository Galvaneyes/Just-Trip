/* globals Promise $ toastr window requester validator */

'use strict';

(() => {
    const $editProfileBtn = $('a.edit-profile-btn');
    const $saveChangesBtn = $('a.save-changes-btn');

    $editProfileBtn.on('click', function() {
        editSpecialty();
    });

    // $saveChangesBtn.on('click', function() {
    //     $summaryContainer.trigger('click');

    //     let $textArea = $('textarea.summary-input');
    //     let $btnSummarySave = $('a.btn-save-summary');

    //     let inputValue = $textArea.val() && $textArea.val().trim();

    //     $textArea.replaceWith(`<span>${inputValue}</span>`);
    //     $btnSummarySave.replaceWith(editSummaryBtnHtml);

    //     let $editMode = $('.edit-mode');
    //     $editMode.addClass('hide');
    //     $(this).addClass('hide');

    //     $editProfileBtn.removeClass('hide');

    //     saveSpecialty();
    // });


    function editSummary($target) {
        // let $btnSummaryEdit = $target.closest('a.btn-summary-edit');
        // let $spanDescription = $btnSummaryEdit.next('span');
        // let currentSummary = $spanDescription.text();

        // let $summaryInput = $(`<textarea class="summary-input form-control animated fadeIn">${currentSummary}</textarea>`);

        // $btnSummaryEdit.replaceWith($saveSummaryBtn);
        // $spanDescription.replaceWith($summaryInput);
    }

    function saveSummary($target) {
        // let $btnSummarySave = $target.closest('a.btn-save-summary');
        // let $textArea = $('textarea.summary-input');

        // return Promise.resolve()
        //     .then(() => {
        //         let inputValue = $textArea.val() && $textArea.val().trim();
        //         inputValue = validator.escape(inputValue);
        //         requester.putJSON('/account/update/summary', { summary: inputValue });

        //         return inputValue;
        //     })
        //     .then((inputValue) => {
        //         $textArea.replaceWith(`<span>${inputValue}</span>`);
        //         $btnSummarySave.replaceWith(editSummaryBtnHtml);
        //     })
        //     .catch((err) => {
        //         toastr.error(err.message);
        //     });
    }

    function editSpecialty() {
        // let $specialty = $('div.card.hovercard div.capitalize.desc');
        // let currentSpecialty = $specialty.text();

        // let $specialtyInput = $('<input class="specialty-input form-control animated fadeIn"/>')
        //     .val(currentSpecialty)
        //     .css({
        //         width: '12em'
        //     });

        // $specialty.replaceWith($specialtyInput);
    }

    function saveSpecialty() {
        let $specialtyInput = $('div.card.hovercard input.specialty-input');

        return Promise.resolve()
            .then(() => {
                let inputValue = $specialtyInput.val() && $specialtyInput.val().trim();
                inputValue = validator.escape(inputValue);
                requester.putJSON('tuk ti trqbva update firstname user', { specialty: inputValue });

                return inputValue;
            })
            .then((inputValue) => {
                $specialtyInput.replaceWith(`<div class="capitalize desc">${inputValue}</div>`);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }

})();