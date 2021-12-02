import "./buttons.scss";

function showWebform(form: Element) {
  form.classList.add("displayWebform");
}

function hideWebform(form: Element) {
  form.classList.remove("displayWebform");
}

function formEmbedSequence(form: Element, parent: Element) {
  showWebform(form);
  const closeBtn = form.getElementsByClassName("-close-btn")[0];

  if (closeBtn == null) {
    return;
  }

  closeBtn.addEventListener("click", function () {
    hideWebform(form);
    parent.classList.remove("hide");
  });
}

window.addEventListener("load", function () {
  webformDataset();
  webformCloseBtn();
  webformFrameResize();
});

const webformDataset = () => {
  const formBtns = document.getElementsByClassName("a-btn__link -form-embed");

  if (formBtns !== undefined) {
    for (let i = 0; i < formBtns.length; i += 1) {
      const formBtn = formBtns[i];
      const parent = formBtn.parentElement;
      formBtn.addEventListener("click", function (event: any) {
        if (parent == null) {
          return;
        }

        if (event == null) {
          return;
        }

        if (event.target == null) {
          return;
        }

        if (event.target.dataset == null) {
          return;
        }

        if (parent.parentElement == null) {
          return;
        }

        const formBtnId = event.target.dataset.id;
        const forms: any = parent.parentElement.getElementsByClassName(
          "-attachedForm"
        );

        for (let i = 0; i < forms.length; i += 1) {
          if (forms[i].dataset.form === formBtnId) {
            formEmbedSequence(forms[i], parent);
          }
        }
      });
    }
  }
};

const webformCloseBtn = () => {
  const formBtns = document.getElementsByClassName("o-buttons__wrapper");

  if (formBtns !== undefined) {
    for (let i = 0; i < formBtns.length; i += 1) {
      const formBtn = formBtns[i];
      const closeBtns = formBtn.getElementsByClassName("-close-btn");
      const revealFormBtns = formBtn.getElementsByClassName(
        "a-btn__link-form-embed"
      );

      if (closeBtns !== undefined) {
        for (let i = 0; i < closeBtns.length; i += 1) {
          const closeBtn = closeBtns[i];
          closeBtn.addEventListener("click", function (event: any) {
            const formsToClose = formBtn.getElementsByClassName(
              "-attachedForm"
            );

            for (var i = 0; i < formsToClose.length; i++) {
              formsToClose[i].classList.remove("show-form");
            }

            formBtn.classList.remove("has-webform");
            formBtn.classList.add("no-webform");
          });
        }
      }

      if (revealFormBtns !== undefined) {
        for (let i = 0; i < revealFormBtns.length; i += 1) {
          const revealFormBtn = revealFormBtns[i];
          revealFormBtn.addEventListener("click", function (event: any) {
            const formToShow = event.target.id;
            const formToReveal = formBtn.querySelectorAll(
              `[data-form="${formToShow}"]`
            );
            formToReveal[0].classList.add("show-form");
            formBtn.classList.remove("no-webform");
            formBtn.classList.add("has-webform");
          });
        }
      }
    }
  }
};

//Resizing frame and submit button on webform
const webformFrameResize = () => {
  const webformFrame = document.querySelectorAll(
    ".o-buttons__wrapper .-attachedForm"
  );
  const webformSubmission = document.querySelectorAll(
    ".o-buttons__wrapper .webform-submission-form"
  );
  const webformSubmitBtn = document.querySelectorAll(
    ".o-buttons__wrapper .webform-button--submit"
  );

  webformSubmission.forEach((element, index) => {
    const formFields = element.querySelectorAll(".js-form-item");
    if (formFields.length === 2) {
      webformFrame[index].classList.add("webform-fields--3");
      webformSubmitBtn[index].classList.add("webformBtn-fields--3");
    }
  });
};
