import React from 'react';
import Grid from 'material-ui/Grid';
import { styles } from './ShellStyles';
import AdminRoutes from '../../Users/Admin/AdminRoutes';
import FacultyRoutes from '../../Users/Faculty/FacultyRoutes';
import StudentRoutes from '../../Users/Student/StudentRoutes';
import LeadRoutes from '../../Users/Lead/LeadRoutes';
import TopNavMenu from '../components/TopNavigationMenu';
/*
    We 'could' combine these three into to one variable function, but it seemed to be simpler to just leave them separate
    This also makes it easier to handle changes in the Header, and Navigation for each role
 */

export const AdminProfile = () => (
    <div>
        <TopNavMenu />
        <main>
          <Grid>
            {AdminRoutes}
          </Grid>
        </main>
    </div>
);

export const LeadProfile = () => (
  <div>
    <TopNavMenu/>
    <main>
      <Grid>
        {LeadRoutes}
      </Grid>
    </main>
  </div>
);

export const FacultyProfile = () => (
    <div>
      <TopNavMenu/>
      <main>
        <Grid>
          {FacultyRoutes}
        </Grid>
      </main>
    </div>
);

export const StudentProfile = () => (
    <div>
      <TopNavMenu/>
      <main>
        <Grid>
          {StudentRoutes}
        </Grid>
      </main>
    </div>
);
