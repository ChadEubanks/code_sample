alto_require('core-app/views/components/engage/label_info_glyph_view.js');

CoreApp.CustomizeEngageView = CoreOs.View.extend({
    classNames: ['customize-engage-view', 'coldstart'],
    childViews: ['DocumentFrame'],

    DocumentFrame: CoreOs.View.extend({
        classNames: ['document-frame'],
        childViews: ['TopSection', 'PackagesListView', 'TeleconferenceFrame', 'TotalFrame', 'Toolbar'],

        TopSection: CoreOs.View.extend({
            classNames: ['top-section'],
            childViews: ['Header', 'Subheader'],

            Header: CoreOs.LabelView.extend({
                classNames: ['header'],
                title: Alto.String.loc('CUSTOMIZE_ENGAGE_HEADER')
            }),

            Subheader: CoreOs.LabelView.extend({
                classNames: ['subheader'],
                title: Alto.String.loc('CUSTOMIZE_ENGAGE_SUBHEADER')
            })

        }),

        PackagesListView: CoreOs.View.extend({
            classNames: ['packages-list-view'],
            childViews: ['StarterPackage', 'WellnessPackage', 'ClinicalPackage'],

            StarterPackage: CoreOs.View.extend({
                classNames: ['starter-package', 'is-selected'],
                childViews: ['Checkbox', 'SectionHeader', 'CostFrame', 'DetailsFrame'],
                isChecked: true,

                Checkbox: CoreOs.Checkbox.extend({
                    classNames: ['package-checkbox'],
                    isChecked: true,

                    isCheckedDidChange: Alto.observer('isChecked', function () {
                        if (this.get('isChecked')) {

                        } else {
                            this.set('isChecked', true);
                        }
                    })
                }),

                SectionHeader: CoreOs.LabelView.extend({
                    classNames: ['section-header'],
                    title: Alto.String.loc('STARTER_PACKAGE_HEADER')
                }),

                CostFrame: CoreOs.View.extend({
                    classNames: ['cost-frame'],
                    childViews: ['Cost', 'Label'],

                    Cost: CoreOs.LabelView.extend({
                        classNames: ['cost'],
                        title: Alto.String.loc('STARTER_PACKAGE_COST_LABEL')
                    }),

                    Label: CoreOs.LabelView.extend({
                        classNames: ['cost-label'],
                        title: Alto.String.loc('PER_LICENSE_PER_MONTH_LABEL')
                    })

                }),

                DetailsFrame: CoreOs.View.extend({
                    classNames: ['details-frame'],
                    childViews: ['PatientProfiles', 'PatientNotes', 'Messaging'],

                    PatientProfiles: CoreApp.LabelInfoGlyphView.extend({
                        title: Alto.String.loc('PATIENT_PROFILES_LABEL')
                    }),

                    PatientNotes: CoreApp.LabelInfoGlyphView.extend({
                        title: Alto.String.loc('PATIENT_NOTES_LABEL')
                    }),

                    Messaging: CoreApp.LabelInfoGlyphView.extend({
                        title: Alto.String.loc('MESSAGING_LABEL')
                    })
                })
            }),

            WellnessPackage: CoreOs.View.extend({
                classNames: ['wellness-package'],
                childViews: ['Checkbox', 'SectionHeader', 'CostFrame', 'DetailsFrame'],

                Checkbox: CoreOs.Checkbox.extend({
                    classNames: ['package-checkbox'],
                    isChecked: false, //todo fix

                    isCheckedDidChange: Alto.observer('isChecked', function () {
                        if (this.get('isChecked')) {
                            this.parentView.get('node').classList.add('is-selected');
                        } else {
                            this.parentView.get('node').classList.remove('is-selected');
                        }
                    })
                }),

                SectionHeader: CoreOs.LabelView.extend({
                    classNames: ['section-header'],
                    title: Alto.String.loc('WELLNESS_PACKAGE_HEADER')
                }),

                CostFrame: CoreOs.View.extend({
                    classNames: ['cost-frame'],
                    childViews: ['Cost', 'Label'],

                    Cost: CoreOs.LabelView.extend({
                        classNames: ['cost'],
                        title: Alto.String.loc('WELLNESS_PACKAGE_COST_LABEL')
                    }),

                    Label: CoreOs.LabelView.extend({
                        classNames: ['cost-label'],
                        title: Alto.String.loc('PER_LICENSE_PER_MONTH_LABEL')
                    })

                }),

                DetailsFrame: CoreOs.View.extend({
                    classNames: ['details-frame'],
                    childViews: ['CarePlans'],

                    CarePlans: CoreApp.LabelInfoGlyphView.extend({
                        classNames :['label-info-glyph-view', 'care-plans'],
                        childViews: ['Label', 'SubLabel', 'InfoGlyph'],
                        title: Alto.String.loc('CARE_PLANS_CUSTOMIZE_LABEL'),

                        SubLabel: CoreOs.LabelView.extend({
                            classNames: ['package-sublabel'],
                            title: Alto.String.loc('CARE_PLANS_CUSTOMIZE_SUBLABEL')
                        })
                    })
                })
            }),

            ClinicalPackage: CoreOs.View.extend({
                classNames: ['clinical-package'],
                childViews: ['Checkbox', 'SectionHeader', 'CostFrame', 'DetailsFrame'],
                isChecked: false, //todo fix

                isCheckedDidChange: Alto.observer('isChecked', function () {
                    if (this.get('isChecked')) {
                        this.get('node').classList.add('is-selected');
                    } else {
                        this.get('node').classList.remove('is-selected');
                    }
                }),

                Checkbox: CoreOs.Checkbox.extend({
                    classNames: ['package-checkbox'],
                    isChecked: false, //todo fix

                    isCheckedDidChange: Alto.observer('isChecked', function () {
                        if (this.get('isChecked')) {
                            this.parentView.get('node').classList.add('is-selected');
                        } else {
                            this.parentView.get('node').classList.remove('is-selected');
                        }
                    })
                }),

                SectionHeader: CoreOs.LabelView.extend({
                    classNames: ['section-header'],
                    title: Alto.String.loc('CLINICAL_PACKAGE_HEADER')
                }),

                CostFrame: CoreOs.View.extend({
                    classNames: ['cost-frame'],
                    childViews: ['Cost', 'Label'],

                    Cost: CoreOs.LabelView.extend({
                        classNames: ['cost'],
                        title: Alto.String.loc('CLINICAL_PACKAGE_COST_LABEL')
                    }),

                    Label: CoreOs.LabelView.extend({
                        classNames: ['cost-label'],
                        title: Alto.String.loc('PER_LICENSE_PER_MONTH_LABEL')
                    })

                }),

                DetailsFrame: CoreOs.View.extend({
                    classNames: ['details-frame'],
                    childViews: ['InsuranceInformation', 'ViewDashboard', 'PatientHealthsnaps', 'PatientOverview'],

                    InsuranceInformation: CoreApp.LabelInfoGlyphView.extend({
                        classNames :['label-info-glyph-view'],
                        title: Alto.String.loc('INSURANCE_INFORMATION_LABEL')
                    }),

                    ViewDashboard: CoreApp.LabelInfoGlyphView.extend({
                        classNames :['label-info-glyph-view'],
                        title: Alto.String.loc('VIEW_DASHBOARD_LABEL')
                    }),

                    PatientHealthsnaps: CoreApp.LabelInfoGlyphView.extend({
                        classNames :['label-info-glyph-view'],
                        title: Alto.String.loc('PATIENT_HEALTHSNAPS_LABEL')
                    }),

                    PatientOverview: CoreApp.LabelInfoGlyphView.extend({
                        classNames :['label-info-glyph-view'],
                        title: Alto.String.loc('PATIENT_OVERVIEW_LABEL')
                    })
                })
            })
        }),

        TeleconferenceFrame: CoreOs.View.extend({
            classNames: ['teleconference-frame'],
            childViews: ['TeleconferenceLabel', 'ComingSoonLabel'],

            TeleconferenceLabel: CoreOs.LabelView.extend({
                classNames: ['teleconference-label'],
                title: Alto.String.loc('TELECONFERENCE_LABEL')
            }),

            ComingSoonLabel: CoreOs.LabelView.extend({
                classNames: ['coming-soon-label'],
                title: Alto.String.loc('COMING_SOON_LABEL')
            })

        }),

        TotalFrame: CoreOs.View.extend({
            classNames: ['total-frame'],
            childViews: ['Label', 'CostFrame'],

            Label: CoreOs.LabelView.extend({
                classNames: ['total-label'],
                title: Alto.String.loc('TOTAL_LABEL_HEADER')
            }),

            CostFrame: CoreOs.View.extend({
                classNames: ['cost-frame'],
                childViews: ['Cost', 'Label'],

                Cost: CoreOs.LabelView.extend({
                    classNames: ['cost'],
                    title: Alto.String.loc('CLINICAL_PACKAGE_COST_LABEL')
                }),

                Label: CoreOs.LabelView.extend({
                    classNames: ['cost-label'],
                    title: Alto.String.loc('PER_LICENSE_PER_MONTH_LABEL')
                })

            })

        }),

        Toolbar: CoreOs.View.extend({
            classNames: ['bottom-toolbar'],
            childViews: ['BackButton', 'ContinueButton'],

            BackButton: CoreOs.ButtonView.extend({
                classNames: ['back-button'],
                title: Alto.String.loc('BACK_BUTTON_TITLE'),
                action: 'previous'
            }),

            ContinueButton: CoreOs.ButtonView.extend({
                classNames: ['continue-button'],
                title: Alto.String.loc('CONTINUE_BUTTON_TITLE'),
                action: 'continue'
            })
        })
    })

})