import { app, BrowserWindow, Menu } from "electron";
import { join } from "path";
import * as isDev from 'electron-is-dev';
import { win } from "./main";

let modalWin: BrowserWindow | undefined = undefined;

function openModalWindow(url: string) {
    if(win){
        modalWin = new BrowserWindow({
            width: 1250,
            height: 800,
            parent: win,
            modal: true,
            show: true,
            minimizable: false,
            maximizable: true,
            movable: true,
            title: "Paramètres",
            webPreferences: {
                nodeIntegration: true,
                contextIsolation: false
            }
        });

        modalWin.setMenu(null);
        modalWin.loadURL(url);
    }
}

const createMenu = (win: BrowserWindow) => {
    let dir = "";
    let baseUrl = "";

    if(isDev){
        dir = join(app.getAppPath(), "assets", "images");
        baseUrl = 'http://localhost:3000/#';
    }else{
        dir = join(app.getAppPath(), ".." ,"assets", "images");
        baseUrl = `file://${__dirname}/../index.html#`;
    }

    const template: Electron.MenuItemConstructorOptions[] = [
        {
            label: "Fichier",
            submenu: [
                {
                    label: "Nouveau",
                    icon: join(dir, "add-file.png"),
                },
                {
                    label: "Créer un nouveau raccourci",
                },
                {
                    label: "Ouvrir",
                    icon: join(dir, "folder.png")
                },
                {
                    label: "Fermer",
                    icon: join(dir, "close-window.png")
                },
                {
                    type: "separator",
                },
                {
                    label: "Quitter",
                    role: "quit",
                },
            ]
        },

        {
            label: "Edition",
            submenu: [
                {
                    label: "Couper",
                    role: "cut",
                    icon: join(dir, "cut.png")
                },
                {
                    label: "Copier",
                    role: "copy",
                    icon: join(dir, "copy.png")
                },
                {
                    label: "Coller",
                    role: "paste",
                    icon: join(dir, "paste.png")
                },
            ]
        },

        {
            label: "Affichage",
            submenu: [
                {
                    label: "Écran d'accueil"
                },
                {
                    label: "Tableau de bord",
                    icon: join(dir, "business-report.png")
                },
                {
                    label: "Alertes",
                    icon: join(dir, "schedule.png")
                },
                {
                    label: "Écran de démarrage",
                    icon: join(dir, "house.png")
                },
            ]
        },

        {
            label: "Favoris",
        },

        {
            label: "Ventes",
            submenu: [
                {
                    label: "Ouvrir Guide de ventes",
                    icon: join(dir, "btree.png")
                },
                {
                    label: "Documents de vente",
                    submenu: [
                        {
                            label: "Devis",
                            icon: join(dir, "bill-green.png")
                        },
                        {
                            label: "Commandes",
                            icon: join(dir, "bill-green.png")
                        },
                        {
                            label: "Bon de livraison",
                            icon: join(dir, "bill-green.png")
                        },
                        {
                            label: "Bon de retour",
                            icon: join(dir, "bill-yellow.png")
                        },
                        {
                            label: "Bon de livraison",
                            icon: join(dir, "bill-blue.png")
                        },
                        {
                            label: "Avoirs",
                            icon: join(dir, "bill-yellow.png")
                        },
                        {
                            label: "Factures d'acompte",
                            icon: join(dir, "bill-blue.png")
                        },
                        {
                            label: "Avoirs d'accompte",
                            icon: join(dir, "bill-yellow.png")
                        },
                        {
                            label: "Tous",
                            icon: join(dir, "bill-yellow.png")
                        },
                    ]
                },
                {
                    label: "Clients",
                    submenu: [
                        {
                            label: "Prospects",
                            icon: join(dir, "user-yellow.png")
                        },
                        {
                            label: "Clients",
                            icon: join(dir, "user-green.png")
                        },
                        {
                            label: "Tous",
                            icon: join(dir, "user-green.png")
                        },
                        {
                            label: "Contacts",
                            icon: join(dir, "user-card.png")
                        },
                        {
                            label: "Familles clients/prospects",
                            icon: join(dir, "user-group.png")
                        },
                        {
                            label: "Sous-familles clients/prospects",
                            icon: join(dir, "user-group.png")
                        },
                        {
                            label: "Historique clients/articles",
                            icon: join(dir, "user-history.png")
                        },
                        {
                            label: "Statistiques",
                            icon: join(dir, "stats.png")
                        },
                        {
                            label: "Facturation périodique",
                            icon: join(dir, "bill-blue.png")
                        },
                    ]
                },
                {
                    label: "Règlements",
                    submenu: [
                        {
                            label: "Échéancier",
                            icon: join(dir, "schedule.png")
                        },
                        {
                            label: "Règlements",
                            icon: join(dir, "dollar.png")
                        },
                        {
                            label: "Lettres de relance",
                            icon: join(dir, "letter.png")
                        },
                        {
                            label: "Remises en banque",
                            icon: join(dir, "bank.png")
                        },
                    ]
                },
                {
                    label: "Commerciaux/collaborateurs"
                },
                {
                    label: "Impressions"
                },
            ],
        },

        {
            label: "Réglements",
            submenu: [
                {
                    label: "Ouvrir Guide de Règlements",
                    icon: join(dir, "btree.png")
                },
                {
                    label: "Clients",
                    submenu: [
                        {
                            label: "Échéancier",
                            icon: join(dir, "schedule.png")
                        },
                        {
                            label: "Règlements",
                            icon: join(dir, "dollar.png")
                        },
                        {
                            label: "Lettres de relance",
                            icon: join(dir, "letter.png")
                        },
                        {
                            label: "Remises en banque",
                            icon: join(dir, "bank.png")
                        },
                    ]
                },
                {
                    label: "Fournisseurs",
                    submenu: [
                        {
                            label: "Échéancier",
                            icon: join(dir, "schedule.png")
                        },
                        {
                            label: "Règlements",
                            icon: join(dir, "dollar.png")
                        },
                        {
                            label: "Décaissements",
                            icon: join(dir, "bank.png")
                        },
                    ]
                },
                {
                    label: "Données"
                },
                {
                    label: "Impressions"
                },
            ],
        },

        {
            label: "Achats",
            submenu: [
                {
                    label: "Ouvrir Guide d'achats",
                    icon: join(dir, "btree.png")
                },
                {
                    label: "Documents d'achat",
                    submenu: [
                        {
                            label: "Demandes de prix",
                            icon: join(dir, "bill-green.png")
                        },
                        {
                            label: "Commandes",
                            icon: join(dir, "bill-green.png")
                        },
                        {
                            label: "Bons de réception",
                            icon: join(dir, "bill-green.png")
                        },
                        {
                            label: "Bons de retour",
                            icon: join(dir, "bill-yellow.png")
                        },
                        {
                            label: "Factures",
                            icon: join(dir, "bill-blue.png")
                        },
                        {
                            label: "Avoirs",
                            icon: join(dir, "bill-yellow.png")
                        },
                        {
                            label: "Factures d'acompte",
                            icon: join(dir, "bill-blue.png")
                        },
                        {
                            label: "Avoirs d'acompte",
                            icon: join(dir, "bill-yellow.png")
                        },
                        {
                            label: "Tous",
                            icon: join(dir, "bill-yellow.png")
                        },
                    ]
                },
                {
                    label: "Fournisseurs",
                    submenu: [
                        {
                            label: "Fournisseurs",
                            icon: join(dir, "user-red.png")
                        },
                        {
                            label: "Contacts",
                            icon: join(dir, "user-card-red.png")
                        },
                        {
                            label: "Familles fournisseurs",
                            icon: join(dir, "user-group-red.png")
                        },
                        {
                            label: "Sous-familles fournisseurs",
                            icon: join(dir, "user-group-red.png")
                        },
                        {
                            label: "Historique fournisseurs/articles",
                            icon: join(dir, "user-history.png")
                        },
                        {
                            label: "Statistiques",
                            icon: join(dir, "stats.png")
                        },
                    ]
                },
                {
                    label: "Règlements",
                    submenu: [
                        {
                            label: "Échéancier",
                            icon: join(dir, "schedule.png")
                        },
                        {
                            label: "Règlements",
                            icon: join(dir, "dollar.png")
                        },
                        {
                            label: "Décaissements",
                            icon: join(dir, "bank.png")
                        },
                    ]
                },
                {
                    label: "Impressions"
                },
            ],
        },

        {
            label: "Stocks/Articles",
            submenu: [
                {
                    label: "Ouvrir Guide de Stocks / Articles",
                    icon: join(dir, "btree.png")
                },
                {
                    label: "Documents de stock",
                    submenu: [
                        {
                            label: "Bons d'entrée",
                            icon: join(dir, "entry.png")
                        },
                        {
                            label: "Bons de sortie",
                            icon: join(dir, "outie.png")
                        },
                        {
                            label: "Inventaire",
                            icon: join(dir, "inventory.png")
                        },
                        {
                            label: "Ordres de transfert",
                            icon: join(dir, "transfert-order.png")
                        },
                        {
                            label: "Bons de transfert",
                            icon: join(dir, "transfert.png")
                        },
                        {
                            label: "Tous",
                            icon: join(dir, "entry.png")
                        },
                        {
                            label: "Mouvements de stock",
                            icon: join(dir, "stock-movement.png")
                        },
                    ]
                },
                {
                    label: "Articles",
                    submenu: [
                        {
                            label: "Articles",
                            icon: join(dir, "article.png")
                        },
                        {
                            label: "Familles d'articles",
                            icon: join(dir, "article-famille.png")
                        },
                        {
                            label: "Sous-familles d'articles",
                            icon: join(dir, "article-famille.png")
                        },
                        {
                            label: "Statistiques",
                            icon: join(dir, "stats.png")
                        },
                        {
                            label: "Historique clients/articles",
                            icon: join(dir, "user-history.png")
                        },
                        {
                            label: "Historique fournisseurs/articles",
                            icon: join(dir, "user-history-red.png")
                        },
                    ]
                },
                {
                    label: "Tarifs clients"
                },
                {
                    label: "Tarifs fournisseurs"
                },
                {
                    label: "Impressions"
                },
            ],
        },

        {
            label: "Opérations",
            submenu: [
                {
                    label: "Ouvrir Guide d'opérations",
                    icon: join(dir, "btree.png")
                },
                {
                    label: "Publier sur reports on line"
                },
                {
                    label: "Documents de vente",
                    submenu: [
                        {
                            label: "Regrouper les documents",
                            icon: join(dir, "inventory.png")
                        },
                        {
                            label: "Livraison de commandes",
                            icon: join(dir, "inventory.png")
                        },
                        {
                            label: "Retour de livraison",
                            icon: join(dir, "inventory.png")
                        },
                        {
                            label: "Retour de facture",
                            icon: join(dir, "inventory.png")
                        },
                        {
                            label: "Lettres de relance",
                            icon: join(dir, "letter.png")
                        },
                        {
                            label: "Générer les factures",
                            icon: join(dir, "bill-blue.png")
                        },
                    ]
                },
                {
                    label: "Documents d'achat",
                    submenu: [
                        {
                            label: "Regrouper les documents",
                            icon: join(dir, "inventory.png")
                        },
                        {
                            label: "Réception de commandes",
                            icon: join(dir, "inventory.png")
                        },
                        {
                            label: "Retour de réception",
                            icon: join(dir, "inventory.png")
                        },
                        {
                            label: "Retour de facture",
                            icon: join(dir, "inventory.png")
                        },
                        {
                            label: "Réappro. fournisseur"
                        },
                    ]
                },
                {
                    label: "Documents de stock",
                },
                {
                    label: "Transfert en comptabilité",
                },
                {
                    label: "DEB/DES",
                    icon: join(dir, "book.png")
                },
                {
                    label: "Assistant de publipostage",
                    icon: join(dir, "publish.png")
                },
                {
                    label: "Map point",
                    icon: join(dir, "pin.png")
                },
                {
                    label: "E-Commerce",
                    icon: join(dir, "worldwide.png")
                },
                {
                    label: "Remplacement de code",
                },
                {
                    label: "Assistants de mise à jour",
                },
                {
                    label: "Impressions",
                },
            ],
        },

        {
            label: "Paramètres",
            submenu: [
                {
                    label: "Ouvrir Guide de paramètres",
                    icon: join(dir, "btree.png")
                },
                {
                    label: "Publications Reports On Line",
                },
                {
                    label: "comptabilité",
                },
                {
                    label: "Taxes",
                    submenu: [
                        {
                            label: "Taux de TVA",
                            icon: join(dir, "percentage.png")
                        },
                        {
                            label: "Autres taxes",
                            icon: join(dir, "percentage.png")
                        },
                        {
                            label: "Barèmes éco-contributions",
                            icon: join(dir, "bareme.png")
                        },
                        {
                            label: "Organismes",
                            icon: join(dir, "gears.png")
                        },
                        {
                            label: "Bases de calcul éco-contribution",
                            icon: join(dir, "sigma.png")
                        },
                        {
                            label: "Eco-contributions mobilier",
                            icon: join(dir, "gears.png")
                        },
                    ]
                },
                {
                    label: "Divers",
                    click: () => {
                        openModalWindow(baseUrl + `/settings/settings_1_1`)
                    }
                },
                {
                    label: "Stock",
                    submenu: [
                        {
                            label: "Emplacements",
                            icon: join(dir, "castle.png")
                        },
                        {
                            label: "Dépots",
                            icon: join(dir, "castle.png")
                        },
                    ]
                },
                {
                    label: "DEB",
                },
                {
                    label: "Société",
                    submenu: [
                        {
                            label: "Coordonnées",
                            icon: join(dir, "house.png"),
                            click: () => {
                                openModalWindow(baseUrl + `/settings/settings_2_1`)
                            }
                        },
                        {
                            label: "Identification",
                            icon: join(dir, "home.png")
                        },
                        {
                            label: "Logo",
                            icon: join(dir, "pictures.png")
                        },
                        {
                            label: "Numérotation",
                            icon: join(dir, "steps.png"),
                            click: () => {
                                openModalWindow(baseUrl + `/settings/settings_3_1`)
                            }
                        },
                        {
                            label: "Articles",
                            icon: join(dir, "article.png")
                        },
                        {
                            label: "Tarifs et promotions",
                            icon: join(dir, "bill-yellow.png")
                        },
                        {
                            label: "Documents de vente",
                            icon: join(dir, "bill-yellow.png")
                        },
                        {
                            label: "Documents d'achat",
                            icon: join(dir, "bill-yellow.png")
                        },
                        {
                            label: "Règlements",
                            icon: join(dir, "dollar.png")
                        },
                        {
                            label: "Documents de stock",
                            icon: join(dir, "article-doc.png")
                        },
                        {
                            label: "Multi-dépôts",
                            icon: join(dir, "castle.png")
                        },
                        {
                            label: "Paramètrage",
                            icon: join(dir, "gears.png")
                        },
                        {
                            label: "Impressions",
                            icon: join(dir, "printer.png")
                        },
                        {
                            label: "Fonctionnalités disponibles",
                            icon: join(dir, "inventory.png")
                        },
                    ]
                },
                {
                    label: "Utilisateurs",
                    submenu: [
                        {
                            label: "Utilisateurs",
                            icon: join(dir, "user-green.png")
                        },
                        {
                            label: "Groupes d'utilisateurs",
                            icon: join(dir, "user-group.png")
                        },
                    ]
                },
                {
                    label: "Personnalisation des champs/tables",
                    icon: join(dir, "schedule.png")
                },
                {
                    label: "Impression",
                },
            ]
        },

        {
            label: "Outils",
            submenu: [
                {
                    label: "Sauvegarde rapide",
                    icon: join(dir, "save.png")
                },
                {
                    label: "Sauvegarde",
                    icon: join(dir, "archive.png")
                },
                {
                    label: "Sauvegarde tous les dossiers",
                    icon: join(dir, "archive.png")
                },
                {
                    label: "Restauration",
                    icon: join(dir, "restore.png")
                },
                {
                    label: "Restaurer tous les dossiers",
                    icon: join(dir, "restore.png")
                },
                {
                    label: "Historique de sauvegardes",
                    icon: join(dir, "save_history.png")
                },
                /* {
                    label: "Administrer les sauvegardes en ligne",
                    icon: join(dir, "archive.png"),
                },
                {
                    type: "separator",
                },
                {
                    label: "Exporter le scéma de l'application",
                    icon: join(dir, "database.png"),
                },
                {
                    type: "separator",
                },
                {
                    label: "Historique des traitements",
                    icon: join(dir, "gears.png"),
                }, */
                {
                    type: "separator",
                },
                {
                    label: "Imports paramétrables",
                    icon: join(dir, "export-file-green.png"),
                },
                {
                    label: "Export paramétrables",
                    icon: join(dir, "export-file-red.png"),
                },
                {
                    label: "Importations de données",
                    icon: join(dir, "export-file-green.png"),
                },
                {
                    label: "Exportation de données",
                    icon: join(dir, "export-file-red.png"),
                },
                /* {
                    label: "Export article L215-3",
                    icon: join(dir, "export-file-red.png"),
                },
                {
                    label: "Déclaration éco-contribution mobilier",
                    icon: join(dir, "export-file-red.png"),
                }, */
                {
                    type: "separator",
                },
                /* {
                    label: "Maintenance des données",
                    icon: join(dir, "maintenance.png"),
                },
                {
                    label: "Outil de requêtage",
                    icon: join(dir, "maintenance.png"),
                }, */
                {
                    label: "Supprimer un dossier",
                    icon: join(dir, "close.png"),
                },
                /* {
                    label: "Synchroniser les données",
                    
                }, */
                {
                    label: "Synchroniser les avec le cloud EBP",
                },
                {
                    type: "separator",
                },
                {
                    label: "Éditeur de modèle d'impression",
                },
                {
                    type: "separator",
                },
                {
                    label: "Import/Export de la configuration",
                },
            ],
        },

        {
            label: "Fenêtres",
            submenu: [
                {
                    label: "Fermer toutes les fenêtre"
                },
            ]
        },

        {
            label: "?",
            submenu: [
                {
                    label: "Sommaire de l'aide"
                },
                {
                    label: "Assistance Online (Question fréquentes)"
                },
                {
                    type: "separator",
                },
                {
                    label: "Activer votre logiciel"
                },
                {
                    type: "separator",
                },
                {
                    label: "Envoyer mes informations de configuration"
                },
                {
                    label: "Enregistrer vos actions"
                },
                {
                    label: "Maintenance à distance"
                },
                {
                    label: "Support technique"
                },
                {
                    type: "separator",
                },
                {
                    label: "Rechercher les mises à jour"
                },
                {
                    label: "Options de mise à jour automatique..."
                },
                {
                    label: "Options de collecte d'informations..."
                },
                {
                    type: "separator",
                },
                {
                    label: "À propos"
                },
                {
                    label: "Nouveautés de la version"
                },
            ]
        },
    ];
    return Menu.buildFromTemplate(template);
}

export default createMenu;