import React from 'react';
import Grid from 'material-ui/Grid';
import AdminRoutes from '../../Users/Admin/AdminRoutes';
import FacultyRoutes from '../../Users/Faculty/FacultyRoutes';
import StudentRoutes from '../../Users/Student/StudentRoutes';
import LeadRoutes from '../../Users/Lead/LeadRoutes';
import TopNavMenu from '../components/TopNavigationMenu';

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
