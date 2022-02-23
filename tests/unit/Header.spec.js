import { shallowMount } from '@vue/test-utils';
// import Vuex from 'vuex';
// import Router from 'vue-router';
import Header from '@/components/Header.vue';
// import i18n from '@/utils/plugins/i18n';

// const localVue = createLocalVue();

// localVue.use(Vuex);
// localVue.use(Router);

// const router = new Router();

describe('Header.vue', () => {
  // let getters;
  // let actions;
  // let store;
  let wrapper;

  beforeEach(() => {
    // getters = {
    //   currentOrg: () => {
    //     return {
    //       name: 'oi',
    //       uuid: '12',
    //       inteligence_organization: 'topp',
    //       authorization: 'true',
    //     };
    //   },
    // };
    // actions = {
    //   setCurrentProject: jest.fn(),
    //   createProject: jest.fn(),
    // };

    // store = new Vuex.Store({
    //   getters,
    //   actions,
    // });

    wrapper = shallowMount(Header, {
      // localVue,
      // i18n,
      // store,
      // router,
      propsData: {},
      stubs: {
        unnnicBreadcrumb: true
      },
    });
  });

  it('renders a snapshot', () => {
    expect(wrapper).toMatchSnapshot();
  });
});
