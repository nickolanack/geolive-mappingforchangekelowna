var wizardTemplate = (map.getDisplayController().getWizardTemplate(('UserAuthWizard')));
        if ((typeof wizardTemplate) != 'function') {
            return false;
        }

        var wizard = wizardTemplate(GeoliveClient, {});

        wizard.buildDefaultAndShow();