/* Import svg definition as data:uri */
/**
`kwc-share-detail`
To display details specific to a kano code share.

@demo demo/index.html
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import '@polymer/iron-flex-layout/iron-flex-layout.js';
import '@polymer/iron-image/iron-image.js';
import '@polymer/iron-pages/iron-pages.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-spinner/paper-spinner-lite.js';
import '@kano/kwc-button/kwc-mega-button.js';
import '@kano/kwc-share-player/kwc-share-player.js';
import '@kano/kwc-share-card/kwc-share-action.js';
import '@kano/kwc-share-card/kwc-share-cover.js';
import '@kano/kwc-drop-down/kwc-drop-down.js';
import '@kano/kwc-drop-down/kwc-drop-down-item.js';
import '@kano/kwc-social-comments/kwc-social-comments.js';
import '@kano/kwc-style/kwc-style.js';
import '@kano/kwc-icons/kwc-icons.js';
import { assets } from './assets.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { html } from '@polymer/polymer/lib/utils/html-tag.js';
Polymer({
    _template: html`
        <style>
            @keyframes fade-in {
                from {
                    opacity: 0;
                }
                to {
                    opacity: 1;
                }
            }
            :host {
                background-color: white;
                border-radius: 0 0 3px 3px;
                display: block;
                overflow: auto;
                font-family: var(--font-body);
                @apply --kw-share-detail;
            }
            :host * {
                box-sizing: border-box;
            }
            :host *[hidden] {
                display: none !important;
            }
            .share {
                @apply --layout-vertical;
                @apply --layout-center;
                display: flex;
                width: 100%;
            }
            .content-prefix {
                background: var(--kw-share-detail-share-background, var(--color-chateau));
                width: 100%;
            }
            .share-content {
                background: var(--kw-share-detail-share-background, var(--color-chateau));
                width: 100%;
                box-sizing: border-box;
                position: relative;
            }
            .share-content .loading {
                color: white;
                transition: opacity 200ms linear;
            }
            :host(.loaded) .share-content .loading {
                opacity: 0;
            }
            #share-container {
                display: flex;
                flex-direction: column;
                justify-content: center;
                animation: fade-in 200ms linear;
                z-index: 10;
            }
            .share-content .content {
                min-height: var(--kw-share-detail-player-height, 480px);
                height: var(--kw-share-detail-player-height, 480px);
                position: relative;
            }
            #share-container,
            .share-content .loading,
            .share-content .content .featured,
            .share-content .loading .overlay {
                @apply --layout-fit;
            }
            .share-content .loading .overlay {
                @apply --layout-vertical;
                @apply --layout-center;
                @apply --layout-center-justified;
            }
            .share-content .content,
            kwc-share-player {
                background-color: transparent;
                height: 100%;
                margin: 0 auto;
                max-width: 800px;
                width: 100%;
            }
            .share-content .content .featured {
                padding: 0 8px;
                z-index: 20;
            }
            .featured {
                background-color: transparent;
                margin: 0;
            }
            kwc-share-player {
                --kwc-share-player-height: 480px;
                position: relative;
            }
            @media all and (max-width: 680px) {
                .share-content .content .featured,
                #share-container>* {
                    max-height: calc(100% - 60px);
                    padding: 0 20px;
                }
            }
            @media all and (min-width: 681px) {
                .share-content .content .featured,
                #share-container>* {
                    max-height: calc(100% - 50px);
                }
            }
            .share-detail {
                max-width: var(--content-width);
                position: relative;
                width: 100%;
                z-index: 0;
            }
            .header {
                @apply --layout-horizontal;
            }
            .avatar-wrapper {
                flex: none;
                overflow: hidden;
                width: 48px;
                height: 48px;
                border-radius: 50%;
                position: relative;
                margin: 0 20px;
            }
            .avatar {
                border-radius: 50%;
                cursor: pointer;
                height: 48px;
                overflow: hidden;
                width: 48px;
            }
            .detail {
                width: 100%;
            }
            .title {
                font-size: 24px;
                line-height: 28px;
                margin: 0;
                display: block;
                @apply --layout-horizontal;
            }
            .title .text {
                @apply --layout-flex-auto;
                color: #333;
            }
            .title .featured-icon {
                @apply --layout-end;
                height: 28px;
                width: 28px;
                margin-left: 6px;
            }
            .title ::slotted(iron-icon) {
                height: 28px;
                margin-top: -10px;
                width: 28px;
            }
            .attribution {
                font-weight: normal;
                margin: 0;
                color: #9FA4A8;
            }
            .author {
                cursor: pointer;
                font-weight: bold;
            }
            .description {
                color: var(--color-chateau);
                line-height: 20px;
                margin: 0;
            }
            .description:not(:empty) {
                font-size: 16px;
                margin: 8px 0 0 0;
            }
            .social-section {
                border-top: 1px solid var(--color-porcelain);
            }
            kw-social-comment {
                width: 100%;
            }
            .actions {
                @apply --layout-horizontal;
                @apply --layout-start-justified;
                @apply --layout-wrap;
                margin-top: 15px;
            }
            .actions kwc-share-action {
                margin: 5px 0px;
                margin-right: 10px;
                position: relative;
            }
            .actions kwc-share-action:last-child {
                margin-right: 0px;
            }
            .actions kwc-share-action paper-spinner-lite {
                height: 18px;
                width: 18px;
                position: absolute;
                top: 9px;
                display: block;
                margin: auto;
            }
            kwc-share-action.like {
                --kwc-share-action-icon-hover-color: var(--color-carnation);
                --kwc-share-action-wrapper-active-color: var(--color-carnation);
                --kwc-share-action-wrapper-active-hover-color: var(--color-carnation);
                --kwc-share-action-label-active-color: #fff;
                --kwc-share-action-icon-active-color: #fff;
            }
            kwc-share-action.remix {
                --kwc-share-action-icon-hover-color: var(--color-kano-orange);
            }
            kwc-share-action.view-code {
                --kwc-share-action-icon-hover-color: var(--color-dodger-blue);
            }
            #more-actions-button .ellipsis {
                width: 21px;
                height: 21px;
                overflow: hidden;
            }
            #more-actions-button .ellipsis iron-icon {
                width: 30px;
                height: 30px;
                margin-top: -4px;
                margin-left: -4px;
            }
            #more-actions-menu {
                transform: translate(-64px, 10px);
            }
            #more-actions-menu kwc-drop-down-item {
                min-width: 150px;
            }
            kwc-drop-down-item.feature {
                --kwc-drop-down-item-icon-hover-color: var(--color-kano-orange);
            }
            kwc-drop-down-item.delete {
                --kwc-drop-down-item-icon-hover-color: var(--color-dodger-blue);
            }
            .social-actions {
                @apply --layout-horizontal;
                @apply --layout-start-justified;
                list-style: none;
                margin: 0;
                padding: 0;
            }
            .social-action {
                box-sizing: border-box;
                margin-right: 16px;
            }
            .social-button {
                border: 0;
                border-radius: 3px;
                color: white;
                cursor: pointer;
                padding: 8px;
                text-transform: uppercase;
                transition: 0.3s ease;
            }
            .social-button:focus {
                outline: 0;
            }
            .social-button.facebook {
                background-color: var(--color-facebook);
            }
            .social-button.twitter {
                background-color: var(--color-twitter);
            }
            .social-button.email {
                background-color: var(--color-kano-orange);
            }
            .social-button .action-icon {
                height: 16px;
                width: 16px;
            }
            .sidebar-section-header {
                font-weight: bold;
                margin-bottom: 10px
            }
            .parts-used-list {
                @apply --layout-horizontal;
                @apply --layout-start-justified;
                @apply --layout-wrap;
                list-style: none;
                margin: 0;
                padding: 0;
            }
            .parts-used-list a {
                margin-right: 6px;
                margin-bottom: 6px;
                padding: 5px 10px 5px 8px;
                border-radius: 5px;
                color: var(--color-chateau);
                background-color: #f6f7f9;
                text-decoration: none;
                @apply --layout-flex-none;
                @apply --layout-horizontal;
                @apply --layout-center-justified;
            }
            .parts-used-list a:hover {
                background-color: #e5e8eC;
            }
            .parts-used-list a.inactive:hover {
                background-color: #f6f7f9;
                cursor: not-allowed;
            }
            .parts-used-list iron-icon {
                color: var(--color-grey);
                width: 24px;
                height: 24px;
                margin-right: 3px;
            }
            .parts-used-list .label {
                line-height: 24px;
            }
            .social,
            .related-shares,
            .parts-used-list {
                margin-bottom: 30px;
            }
            .stats {
                margin: 10px 0px 25px 0px;
                color: var(--color-grey);
            }
            .stats span {
                margin-right: 15px;
            }
            .related-shares-list {
                @apply --layout-horizontal;
                @apply --layout-wrap;
                margin-top: -5px;
                margin-left: -5px;
                margin-bottom: -5px;
                min-width: 250px;
            }
            .related-shares-cover {
                border: 1px solid var(--color-porcelain);
                width: 114px;
                height: 82px;
                margin: 5px;
                --kwc-share-cover-spritesheet: {
                    width: 160px;
                    transform: translateX(-40px);
                }
            }
            :host([tombstone]) .avatar,
            :host([tombstone]) .avatar-wrapper {
                background: var(--color-grey-lightest);
                color: transparent;
            }
            :host([tombstone]) .title {
                width: 200px;
                height: 22px;
                background: var(--color-grey-lightest);
                color: transparent;
            }
            :host([tombstone]) .attribution {
                position: relative;
                width: 100px;
                height: 16px;
                background: var(--color-grey-lightest);
                color: transparent;
                margin-top: 6px;
            }
            :host([tombstone]) .description {
                width: 100%;
                height: 36px;
                background: var(--color-grey-lightest);
                color: transparent;
                margin-top: 6px;
                margin-bottom: 12px;
            }
            :host([tombstone]) .supplementary-details,
            :host([tombstone]) #share-container,
            :host([tombstone]) .social {
                opacity: 0.3;
            }
            @media all and (max-width: 780px) {
                .share-detail {
                    @apply --layout-vertical;
                    padding: 16px 16px;
                }
                .supplementary-details {
                    @apply --layout-vertical;
                    padding: 36px 0 0 0;
                }
                .supplementary-details .actions {
                    margin: 0 0 36px 0;
                }
            }
            @media all and (min-width: 581px) and (max-width: 780px) {
                .supplementary-details {
                    padding: 0 0 0 36px;
                }
                .actions,
                .social {
                    @apply --layout-flex-auto;
                }
                .supplementary-details > * {
                    margin-right: 18px;
                }
            }
            @media all and (min-width: 781px) {
                #share-container {
                    padding: 0 60px;
                }
                .share-detail {
                    @apply --layout-horizontal;
                    max-width: 888px;
                }
                .main-details {
                    @apply --layout-flex-8;
                    padding: 32px 44px 32px 8px;
                }
                .supplementary-details {
                    @apply --layout-flex-4;
                    color: var(--color-grey);
                    padding: 32px 40px 32px 44px;
                }
            }
        </style>
        <div id="share" class="share">
            <div class="content-prefix">
                <slot name="content::before"></slot>
            </div>
            <div class="share-content">
                <div class="loading">
                    <div class="overlay">
                        <paper-spinner-lite class="spinner" active=""></paper-spinner-lite>
                    </div>
                </div>
                <div class="content">
                    <div id="share-container">
                        <slot name="player::before"></slot>
                        <kwc-share-player share="[[shareData]]" display-code="{{displayCode}}">
                        </kwc-share-player>
                        <slot name="player::after"></slot>
                    </div>
                </div>
                <slot name="share-hardware"></slot>
            </div>
            <div class="content-suffix">
                <slot name="content::after"></slot>
            </div>
            <div class="share-detail">
                <div class="main-details">
                    <div class="header">
                        <div class="avatar-wrapper">
                            <iron-image class="avatar" src\$="[[_avatarUrl]]" sizing="cover" on-tap="_onUserTapped" preload="" fade="">
                                        </iron-image>
                        </div>
                        <div class="detail">
                            <h3 class="title">
                                <slot name="title-icon"></slot>
                                <div class="text">[[shareData.title]]</div>
                                <iron-image class="featured-icon" src\$="[[_featuredIconUrl]]" sizing="contain" hidden\$="[[!featured]]" preload="" fade="">
                                </iron-image>
                            </h3>
                            <h4 class="attribution">by
                                <a class="author" on-tap="_onUserTapped">[[shareData.username]]
                                   </a>
                            </h4>
                            <p class="description">[[shareData.description]]</p>
                            <div class="actions">
                                <template is="dom-if" if="[[!_sharedByUser]]">
                                    <kwc-share-action class="like" icon="kwc-ui-icons:like" on-tap="_onLikeTapped" active="[[liked]]">
                                        [[_computedLikeButtonText(liked)]]
                                        <paper-spinner-lite active="[[submitingLike]]">
                                        </paper-spinner-lite>
                                    </kwc-share-action>
                                </template>
                                <template is="dom-if" if="[[_showRemixButton(shareData, canRemix)]]">
                                    <kwc-share-action class="remix" icon="kwc-social-icons:remix" on-tap="_onRemixTapped">Remix</kwc-share-action>
                                </template>
                                <template is="dom-if" if="[[_showCodeButton(shareData)]]">
                                    <kwc-share-action class="view-code" icon="kwc-social-icons:code" on-tap="_toggleCodeView">View&nbsp;code</kwc-share-action>
                                </template>
                                <kwc-share-action id="more-actions-button" on-tap="_onMoreActionsTapped" active="[[dropDownOpened]]" hidden\$="[[!_showMoreActions(shareData, currentUser.admin_level, _displayMetaActions)]]">
                                    <div class="ellipsis">
                                        <iron-icon icon="kwc-ui-icons:ellipsis"></iron-icon>
                                    </div>
                                    <kwc-drop-down id="more-actions-menu" caret-position="center" opened="{{dropDownOpened}}">
                                        <template is="dom-if" if="[[_showFeaturedButton(shareData, currentUser.admin_level)]]">
                                            <kwc-drop-down-item class="feature" icon="kwc-ui-icons:rosette" on-tap="_onFeatureTapped">[[_computeFeatureButtonText(featured)]]</kwc-drop-down-item>
                                        </template>
                                        <template is="dom-if" if="[[_displayMetaActions]]">
                                            <kwc-drop-down-item class="delete" icon="kwc-ui-icons:rubbish-bin" on-tap="_onDeleteTapped">Delete</kwc-drop-down-item>
                                        </template>
                                    </kwc-drop-down>
                                </kwc-share-action>
                            </div>
                            <div class="stats">
                                <span hidden\$="[[!likes.length]]">[[likes.length]] Likes</span>
                                <span hidden\$="[[!comments.count]]">[[comments.count]] Comments</span>
                                <span hidden\$="[[!shareData.views_count]]">[[shareData.views_count]] Views</span>
                            </div>
                        </div>
                    </div>
                    <div class="social">
                        <!-- Set up with support for showing lists of
                                 likes and remixes in future, when the API support
                                 is available -->
                        <iron-pages id="social-sections" selected="[[_section]]" attr-for-selected="section-name" fallback-selection="comments">
                            <div section-name="comments" class="social-section">
                                <kwc-social-comments id="comments" comments="[[comments.entries]]" default-avatar="[[_defaultCommentAvatarUrl]]" next-page="[[comments.page]]" item-id="[[shareData.id]]" tombstone\$="[[!shareData]]" user="[[currentUser]]" loader-status="[[commentLoaderStatus]]" comment-flags="[[commentFlags]]" on-delete-comment="_handleDeleteComment" on-load-comment="_handleLoadComment" on-post-comment="_handlePostComment" on-flag-comment="_handleFlagComment" on-unflag-comment="_handleUnflagComment" on-view-user="_handleViewUser">
                                                     </kwc-social-comments>
                            </div>
                        </iron-pages>
                    </div>
                </div>
                <div class="supplementary-details">
                    <template is="dom-if" if="[[_showRelatedShares(related)]]">
                        <div class="related-shares">
                            <div class="sidebar-section-header">More from [[shareData.username]]</div>
                            <div class="related-shares-list">
                                <template is="dom-repeat" items="[[related]]">
                                    <a href="[[item.targetUrl]]">
                                        <kwc-share-cover class="related-shares-cover" image-url="[[item.imageUrl]]" spritesheet-url="[[item.spritesheetUrl]]">
                                        </kwc-share-cover>
                                    </a>
                                </template>
                            </div>
                        </div>
                    </template>
                    <template is="dom-if" if="[[_anyHardwareUsed(shareData.hardware)]]">
                        <div class="parts-used">
                            <div class="sidebar-section-header">Parts Used</div>
                            <ul class="parts-used-list">
                                <template is="dom-repeat" items="[[shareData.hardware]]">
                                    <li>
                                        <a href\$="[[_getLinkForPartId(item.product)]]" class\$="[[_computePartsLinkClass(item.product)]]">
                                            <iron-icon icon="kwc-part-icons:[[item.product]]"></iron-icon>
                                            <div class="label">[[_getLabelForPartId(item.product)]]</div>
                                        </a>
                                    </li>
                                </template>
                            </ul>
                        </div>
                    </template>
                    <div class="social">
                        <div class="sidebar-section-header">Share</div>
                        <ul class="social-actions">
                            <li class="social-action">
                                <button class="social-button facebook" on-tap="_onFacebookTapped">
                                    <iron-icon class="action-icon" icon="kwc-social-icons:facebook"></iron-icon>
                                </button>
                            </li>
                            <li class="social-action">
                                <button class="social-button twitter" on-tap="_onTwitterTapped">
                                    <iron-icon class="action-icon" icon="kwc-social-icons:twitter"></iron-icon>
                                </button>
                            </li>
                            <li class="social-action">
                                <button class="social-button email" on-tap="_onEmailTapped">
                                    <iron-icon class="action-icon" icon="kwc-social-icons:share"></iron-icon>
                                </button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
`,

    is: 'kwc-share-detail',

    properties: {
        /**
           * The current share data to display.
           * @type {Object}
           */
        shareData: {
            type: Object
        },
        /**
           * Flag to indicate whether the code display div should be shown.
           * @type {Boolean}
           */
        displayCode: {
            type: Boolean,
            value: false
        },
        /**
           * Flag to indicate whether the code can be remixed.
           * Used to decide whether to displat the REMIX button
           * @type {Boolean}
           */
        canRemix: {
            type: Boolean,
            value: false
        },
        /**
           * Flag to indicate that the current share attachment is loaded.
           * @type {Boolean}
           */
        loaded: {
            type: Boolean,
            value: false,
            notify: true
        },
        /**
           * Computed property that gives a url for the avatar to show for the
           * share author.
           * @type {String}
           */
        _avatarUrl: {
            type: String,
            computed: '_computeAvatarUrl(shareData)'
        },
        /**
           * A comments object. Expects a property called `entries` that is to
           * be passed to the `kwc-social-comments` component and a count property of the
           * number of comments ojects in the `entries` array.
           * ```js
           * {
           *     "type": "object",
           *     "properties": {
           *         "entries": {
           *             "type": "object",
           *             "properties": // See https://components.kano.me/#/elements/kwc-social-comments
           *         },
           *         "count": {
           *             "type": "number"
           *         },
           *         "page": {
           *             "type": "number"
           *         }
           *     },
           *     "required" : ["entries", "count"]
           * }
           * ```
           * @type {Object}
           */
        comments: {
            type: Object,
            value: () => {
                return {};
            }
        },
        /**
           * A computed flag (based on the comments.page property) to indicate
           * the social comments component whether there are more comments to load.
           * @type {Boolean}
           */
        commentLoaderStatus: {
            type: String,
            computed: '_computeLoaderStatus(comments.*)'
        },
        /**
           * Login in users flags on comments and shares.
           * {
           *    shares: [],
           *    comments: [],
           * }
           * @type {Object}
           */
        flags: {
            type: Object,
            value: () => {
                return {};
            }
        },
        /**
           * From flags, but checks if flags exist
           * @type {Array}
           */
        commentFlags: {
            type: Array,
            computed: '_computeCommentFlags(flags.*)'
        },
        /**
           * A url to use as the default avatar for the comments component to use
           * when a comment author does not have one set.
           * @type {String}
           */
        _defaultCommentAvatarUrl: {
            type: String,
            value: () => {
                return assets.avatar;
            }
        },
        /**
           * Convenience flag to indicate whether the controls for the
           * share – delete button etc – should be displayed
           * @type {Boolean}
           */
        _displayMetaActions: {
            type: Boolean,
            computed: '_computeMetaActionDisplay(_sharedByUser, _userIsAdmin)'
        },
        /**
           * Flag whether the share is featured on not.
           * @type {Boolean}
           */
        featured: {
            type: Boolean,
            value: false,
            reflectToAtrribute: true
        },
        /**
           * Allow the icon to display for a featured share to be set from
           * outside the component
           * @type {String}
           */
        featuredIconUrl: {
            type: String,
            value: null
        },
        /**
           * Use the `featuredIconUrl` or a default icon url.
           * @type {String}
           */
        _featuredIconUrl: {
            type: String,
            computed: '_computeFeaturedIconUrl(featuredIconUrl)'
        },
        /**
           * Currently authenticated user. An object with the user data
           * @type {Object}
           */
        currentUser: {
            type: Object,
            value: () => {
                return {};
            }
        },
        /**
           * A selector for the subpage to show in the social nav. Currently only
           * one option, but set up to accept remix tab when implemented.
           * @type {String}
           */
        _section: {
            type: String,
            value: 'comments'
        },
        /**
           * A list of like objects used to calculate the number of likes for the share
           * and whether the current user has liked this particular share.
           * @type {Array}
           */
        likes: {
            type: Array,
            value: () => {
                return [];
            }
        },
        /**
           * Computed property that watches the liked list and returns true is
           * it contains a like with the current user id.
           * @type {Boolean}
           */
        liked: {
            type: Boolean,
            computed: '_computeLiked(likes.*, currentUser)'
        },
        /**
           * Property to indicate whether we are currently submiting a like request.
           * @type {Boolean}
           */
        submitingLike: {
            type: Boolean,
            value: false
        },
        /**
           * Flag to indicate if the current share is authored by the current authenticated
           * user. This can inform the UI what should be hidden or shown accordingly.
           * @type {Boolean}
           */
        _sharedByUser: {
            type: Boolean,
            computed: '_computeSharedByUser(shareData, currentUser)'
        },
        /**
           * Convenience flag to indicate whether the current user
           * is an admin
           * @type {Boolean}
           */
        _userIsAdmin: {
            type: Boolean,
            computed: '_computeUserIsAdmin(currentUser.admin_level)'
        },
        /**
           * A map of part ids to labels and links.
           *
           * @type {Object}
           */
        knownParts: {
            type: Object,
            value: () => {
                return {
                    'motion-sensor': {
                        label: 'Motion sensor',
                        link: 'https://kano.me/store/products/motion-sensor-kit'
                    },
                    'lightboard': {
                        label: 'Pixel kit',
                        link: 'https://kano.me/store/products/pixel-kit'
                    },
                    'speaker': {
                        label: 'Speaker'
                    },
                    'gyro-accelerometer': {
                        label: 'Tilt sensor'
                    },
                    'microphone': {
                        label: 'Microphone'
                    }
                };
            }
        },
        /** An array of related shares (four is the recommended number).
           *
           *  Expected format of each entry:
           *
           *  {
           *      targetUrl: String,
           *
           *      imageUrl: String,
           *      spritesheetUrl: String
           *  }
           *
           *  For entries with both imageUrl and spritesheetUrl,
           *  the later takes priority.
           *
           * @type {Array}
           */
        related: {
            type: Array
        }
    },

    observers: [
        '_shareDataChanged(shareData.*)'
    ],

    /** Computed values*/
    _computeAvatarUrl(shareData) {
        if (shareData) {
            if (shareData.userAvatar) {
                return shareData.userAvatar;
            } else {
                return assets.avatar;
            }
        } else {
            /** No share provided, don't set the avatar */
            return ''; //Valid URI
        }
    },

    _computeLoaderStatus(commentChangeObj) {
        const comments = commentChangeObj.base;
        if (comments) {
            return comments.page ? 'on' : 'off';
        } else {
            return 'off';
        }
    },

    _computeCommentFlags() {
        if (!this.flags) {
            return [];
        }
        return this.flags.comments;
    },

    _computeFeaturedIconUrl() {
        if (this.featuredIconUrl) {
            return this.featuredIconUrl;
        }
        return assets.featured || ''; //Valid URI
    },

    _computeFeatureClass(featured) {
        const baseClass = 'action-button feature';
        const activeClass = featured ? 'featured' : 'default';
        return `${baseClass} ${activeClass}`;
    },

    _computeSharedByUser(shareData, currentUser) {
        if (!shareData || !currentUser) {
            return false;
        }
        return shareData.userId === currentUser.id;
    },

    _computeLiked(likeChangeObj, currentUser) {
        const likes = likeChangeObj.base;
        if (likes && likes.length && currentUser) {
            const liked = likes.some((like) => {
                return like.user === currentUser.id;
            });
            return liked;
        } else {
            return false;
        }
    },

    _computeLikeClass(liked) {
        const baseClass = 'action-button like';
        const activeClass = liked ? 'liked' : 'not-liked';
        return `${baseClass} ${activeClass}`;
    },

    _computedLikeButtonText(liked) {
        return liked ? 'Liked' : 'Like';
    },

    _computeFeatureButtonText(featured) {
        return featured ? 'Un-staff pick' : 'Staff pick';
    },

    _getLabelForPartId(partId) {
        if (this.knownParts && this.knownParts[partId]) {
            return this.knownParts[partId].label;
        }

        return partId;
    },

    _getLinkForPartId(partId) {
        if (this.knownParts &&
            this.knownParts[partId] &&
            this.knownParts[partId].link) {

            return this.knownParts[partId].link;
        }

        return null;
    },

    _computeNavItemClass(section, id) {
        const baseClass = 'nav-item';
        const activeClass = section === id ? 'active' : 'inactive';
        return `${baseClass} ${activeClass}`;
    },

    /**
     * Compute whether share controls – delete button etc – should
     * display
     * @param {Boolean} sharedByUser
     * @param {Boolean} userIsAdmin
     * @returns {Boolean}
     */
    _computeMetaActionDisplay(sharedByUser, userIsAdmin) {
        return sharedByUser || userIsAdmin;
    },

    /**
     * Compute whether the current user is an adminstrator
     * @param {Number} adminLevel
     * @returns {Boolean}
     */
    _computeUserIsAdmin(adminLevel) {
        return adminLevel && adminLevel > 0;
    },

    _computePartsLinkClass(product) {
        if (!this._getLinkForPartId(product)) {
            return 'inactive';
        }
    },

    _shareDataChanged(shareDataChangeObj) {
        const shareData = shareDataChangeObj.base;
        if (shareData && shareData.id) {
            return this.toggleClass('loaded', true);
        }
    },

    _showComments() {
        this.set('_section', 'comments');
    },

    _showLikes() {
        this.set('_section', 'likes');
    },

    _showCodeButton(shareData) {
        let attachmentExt;
        if (shareData && shareData.attachment_url) {
            attachmentExt = shareData.attachment_url.split('.').pop();
            if (['html', 'draw', 'lightcode'].indexOf(attachmentExt) !== -1) {
                return true;
            }
        }
        return false;
    },

    /**
     * Check whether this share can be remixed (or not)
     * @param {Object} share Current share data
     * @param {Boolean} canRemix Flag this share can be remixed
     * @return {Boolean}
     */
    _showRemixButton(share, canRemix) {
        if (share && canRemix) {
            return true;
        } else {
            return false;
        }
    },

    /**
     * Check whether the current user is admin. Used to hide or show the
     * fetured button.
     * @param {Object} share Current share data
     * @param {Boolean} isAdmin Flag this user as admin
     * @return {Boolean}
     */
    _showFeaturedButton(share, isAdmin) {
        return share && isAdmin;
    },

    _showMoreActions(shareData, userAdminLevel, displayMetaActions) {
        return this._showFeaturedButton(shareData, userAdminLevel) || displayMetaActions;
    },

    _showRelatedShares(related) {
        return related && related.length > 0;
    },

    /**
     * Check if any hardware was used in the current creation.
     *
     * @param {Array} hardware As returned from the API.
     * @returns {Boolean} When more than one hardware flag is present.
     */
    _anyHardwareUsed(hardware) {
        return hardware && hardware.length > 0;
    },

    _onDeleteTapped() {
        this.dispatchEvent(new CustomEvent('action-click', {
            detail: {
                action: 'delete',
                id: this.shareData ? this.shareData.id : null,
                slug: this.shareData ? this.shareData.slug : null
            }
        }));
    },

    /** Event listeners */
    _onFeatureTapped() {
        this.dispatchEvent(new CustomEvent('action-click', {
            detail: {
                action: 'feature',
                feature: !this.shareData.featured,
                id: this.shareData.id
            }
        }));
    },

    _onLikeTapped() {
        if (this._sharedByUser || this.submitingLike) {
            return;
        }
        this.dispatchEvent(new CustomEvent('action-click', {
            detail: {
                action: 'like',
                liked: !this.liked,
                shareId: this.shareData ? this.shareData.id : null,
                shareUserId: this.shareData ? this.shareData.userId : null,
                userId: this.currentUser ? this.currentUser.id : null
            }
        }));
    },

    _onRemixTapped() {
        const item = this.shareData;
        if (!item) {
            return;
        }

        this.dispatchEvent(new CustomEvent('action-click', {
            detail: {
                action: 'remix',
                shareId: item.id,
                shareSlug: item.slug,
                shareType: item.app
            }
        }));
    },

    _onMoreActionsTapped(e) {
        /* The drop-down attaches a click event to window which may happen faster than
             his gets propagated and will close the modal immediately. Stopping propagation
             here prevents that. */
        e.stopPropagation();

        this.$['more-actions-menu'].toggle();
    },

    _toggleCodeView() {
        const newValue = !this.displayCode;
        this.set('displayCode', newValue);
    },

    _onUserTapped() {
        const share = this.shareData;
        if (!share) {
            return;
        }
        this.dispatchEvent(new CustomEvent('view-user', {
            detail: {
                id: this.shareData.userId,
                username: this.shareData.username
            }
        }));
    },

    _onEmailTapped() {
        this.dispatchEvent(new CustomEvent('social-share', {
            detail: {
                action: 'email',
                share: this.shareData
            }
        }));
    },

    _onFacebookTapped() {
        this.dispatchEvent(new CustomEvent('social-share', {
            detail: {
                action: 'facebook',
                share: this.shareData
            }
        }));
    },

    _onTwitterTapped() {
        this.dispatchEvent(new CustomEvent('social-share', {
            detail: {
                action: 'twitter',
                share: this.shareData
            }
        }));
    },

    _handleDeleteComment(e) {
        this.dispatchEvent(new CustomEvent('delete-comment', {
            detail: e.detail
        }));
    },

    _handlePostComment(e) {
        this.dispatchEvent(new CustomEvent('post-comment', {
            detail: e.detail
        }));
    },

    _handleLoadComment(e) {
        this.dispatchEvent(new CustomEvent('load-comment', {
            detail: e.detail
        }));
    },

    _handleFlagComment(e) {
        this.dispatchEvent(new CustomEvent('flag-comment', {
            detail: e.detail
        }));
    },

    _handleUnflagComment(e) {
        this.dispatchEvent(new CustomEvent('unflag-comment', {
            detail: e.detail
        }));
    },

    _handleViewUser(e) {
        this.dispatchEvent(new CustomEvent('view-user', {
            detail: e.detail
        }));
    },

    /** Fire an event upwards for tracking purposes */
    _handleHardwareClick(e) {
        const linkElement = e.path.find(element => {
            return element.href !== undefined;
        }),
            link = linkElement.href;
        this.dispatchEvent(new CustomEvent('hardware-click', {
            detail: { link }
        }));
    }
});
