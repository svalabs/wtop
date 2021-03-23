import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The javascript `Date` as integer. Type represents date and time as number of milliseconds from start of UNIX epoch. */
  Timestamp: any;
};

export type Mutation = {
  __typename?: 'Mutation';
  purgeCourse: Scalars['Boolean'];
  purgeLesson: Scalars['Boolean'];
  purgeStudent: Scalars['Boolean'];
};


export type MutationPurgeCourseArgs = {
  course: Scalars['String'];
};


export type MutationPurgeLessonArgs = {
  course: Scalars['String'];
  lesson: Scalars['String'];
};


export type MutationPurgeStudentArgs = {
  user: Scalars['String'];
};

export type ProgressEntry = {
  __typename?: 'ProgressEntry';
  course: Scalars['String'];
  createdAt: Scalars['Timestamp'];
  id: Scalars['ID'];
  lesson: Scalars['String'];
  progress: Scalars['Float'];
  user: Scalars['String'];
  userName: Scalars['String'];
};

export type ProgressEntryView = {
  __typename?: 'ProgressEntryView';
  course: Scalars['String'];
  isFinished: Scalars['Boolean'];
  lesson: Scalars['String'];
  progress: Scalars['Float'];
  user: Scalars['String'];
  userName: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  getConnectedUsers: Scalars['Int'];
  getCourses: Array<Scalars['String']>;
  getLessons: Array<Scalars['String']>;
  getLessonsByUser: Array<UserLesson>;
  getProgress: Array<ProgressEntryView>;
  getProgressByUser: Array<ProgressEntry>;
  getUserName?: Maybe<Scalars['String']>;
};


export type QueryGetLessonsArgs = {
  course: Scalars['String'];
};


export type QueryGetLessonsByUserArgs = {
  uuid: Scalars['String'];
};


export type QueryGetProgressArgs = {
  course: Scalars['String'];
  lesson: Scalars['String'];
};


export type QueryGetProgressByUserArgs = {
  course: Scalars['String'];
  lesson: Scalars['String'];
  uuid: Scalars['String'];
};


export type QueryGetUserNameArgs = {
  course: Scalars['String'];
  lesson: Scalars['String'];
  uuid: Scalars['String'];
};

export type Subscription = {
  __typename?: 'Subscription';
  courseSubscription: ProgressEntryView;
  userSubscription: Scalars['Int'];
};


export type SubscriptionCourseSubscriptionArgs = {
  course: Scalars['String'];
  lesson: Scalars['String'];
};


export type UserLesson = {
  __typename?: 'UserLesson';
  course: Scalars['String'];
  lesson: Scalars['String'];
  uuid: Scalars['String'];
};

export type GetCoursesQueryVariables = Exact<{ [key: string]: never; }>;


export type GetCoursesQuery = (
  { __typename?: 'Query' }
  & { courses: Query['getCourses'] }
);

export type GetProgressQueryVariables = Exact<{
  course: Scalars['String'];
  lesson: Scalars['String'];
}>;


export type GetProgressQuery = (
  { __typename?: 'Query' }
  & { progress: Array<(
    { __typename?: 'ProgressEntryView' }
    & Pick<ProgressEntryView, 'user' | 'progress' | 'userName' | 'isFinished'>
  )> }
);

export type GetUserDataQueryVariables = Exact<{
  course: Scalars['String'];
  lesson: Scalars['String'];
  uuid: Scalars['String'];
}>;


export type GetUserDataQuery = (
  { __typename?: 'Query' }
  & { userName: Query['getUserName'] }
  & { progress: Array<(
    { __typename?: 'ProgressEntry' }
    & Pick<ProgressEntry, 'progress' | 'createdAt'>
  )>, otherLessons: Array<(
    { __typename?: 'UserLesson' }
    & Pick<UserLesson, 'lesson' | 'course'>
  )> }
);

export type OnProgressUpdateSubscriptionVariables = Exact<{
  course: Scalars['String'];
  lesson: Scalars['String'];
}>;


export type OnProgressUpdateSubscription = (
  { __typename?: 'Subscription' }
  & { courseSubscription: (
    { __typename?: 'ProgressEntryView' }
    & Pick<ProgressEntryView, 'user' | 'progress' | 'userName' | 'isFinished'>
  ) }
);

export type OnUserConnectSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type OnUserConnectSubscription = (
  { __typename?: 'Subscription' }
  & { users: Subscription['userSubscription'] }
);

export type GetConnectedUsersQueryVariables = Exact<{ [key: string]: never; }>;


export type GetConnectedUsersQuery = (
  { __typename?: 'Query' }
  & { users: Query['getConnectedUsers'] }
);

export type GetLessonsQueryVariables = Exact<{
  course: Scalars['String'];
}>;


export type GetLessonsQuery = (
  { __typename?: 'Query' }
  & { lessons: Query['getLessons'] }
);

export type DeleteCourseMutationVariables = Exact<{
  course: Scalars['String'];
}>;


export type DeleteCourseMutation = (
  { __typename?: 'Mutation' }
  & { status: Mutation['purgeCourse'] }
);

export type DeleteLessonMutationVariables = Exact<{
  course: Scalars['String'];
  lesson: Scalars['String'];
}>;


export type DeleteLessonMutation = (
  { __typename?: 'Mutation' }
  & { status: Mutation['purgeLesson'] }
);


export const GetCoursesDocument = gql`
    query getCourses {
  courses: getCourses
}
    `;

/**
 * __useGetCoursesQuery__
 *
 * To run a query within a React component, call `useGetCoursesQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCoursesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCoursesQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetCoursesQuery(baseOptions?: Apollo.QueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
      }
export function useGetCoursesLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCoursesQuery, GetCoursesQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCoursesQuery, GetCoursesQueryVariables>(GetCoursesDocument, options);
        }
export type GetCoursesQueryHookResult = ReturnType<typeof useGetCoursesQuery>;
export type GetCoursesLazyQueryHookResult = ReturnType<typeof useGetCoursesLazyQuery>;
export type GetCoursesQueryResult = Apollo.QueryResult<GetCoursesQuery, GetCoursesQueryVariables>;
export const GetProgressDocument = gql`
    query getProgress($course: String!, $lesson: String!) {
  progress: getProgress(course: $course, lesson: $lesson) {
    user
    progress
    userName
    isFinished
  }
}
    `;

/**
 * __useGetProgressQuery__
 *
 * To run a query within a React component, call `useGetProgressQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetProgressQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetProgressQuery({
 *   variables: {
 *      course: // value for 'course'
 *      lesson: // value for 'lesson'
 *   },
 * });
 */
export function useGetProgressQuery(baseOptions: Apollo.QueryHookOptions<GetProgressQuery, GetProgressQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetProgressQuery, GetProgressQueryVariables>(GetProgressDocument, options);
      }
export function useGetProgressLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetProgressQuery, GetProgressQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetProgressQuery, GetProgressQueryVariables>(GetProgressDocument, options);
        }
export type GetProgressQueryHookResult = ReturnType<typeof useGetProgressQuery>;
export type GetProgressLazyQueryHookResult = ReturnType<typeof useGetProgressLazyQuery>;
export type GetProgressQueryResult = Apollo.QueryResult<GetProgressQuery, GetProgressQueryVariables>;
export const GetUserDataDocument = gql`
    query getUserData($course: String!, $lesson: String!, $uuid: String!) {
  progress: getProgressByUser(course: $course, lesson: $lesson, uuid: $uuid) {
    progress
    createdAt
  }
  userName: getUserName(course: $course, lesson: $lesson, uuid: $uuid)
  otherLessons: getLessonsByUser(uuid: $uuid) {
    lesson
    course
  }
}
    `;

/**
 * __useGetUserDataQuery__
 *
 * To run a query within a React component, call `useGetUserDataQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetUserDataQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetUserDataQuery({
 *   variables: {
 *      course: // value for 'course'
 *      lesson: // value for 'lesson'
 *      uuid: // value for 'uuid'
 *   },
 * });
 */
export function useGetUserDataQuery(baseOptions: Apollo.QueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
      }
export function useGetUserDataLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetUserDataQuery, GetUserDataQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetUserDataQuery, GetUserDataQueryVariables>(GetUserDataDocument, options);
        }
export type GetUserDataQueryHookResult = ReturnType<typeof useGetUserDataQuery>;
export type GetUserDataLazyQueryHookResult = ReturnType<typeof useGetUserDataLazyQuery>;
export type GetUserDataQueryResult = Apollo.QueryResult<GetUserDataQuery, GetUserDataQueryVariables>;
export const OnProgressUpdateDocument = gql`
    subscription OnProgressUpdate($course: String!, $lesson: String!) {
  courseSubscription(course: $course, lesson: $lesson) {
    user
    progress
    userName
    isFinished
  }
}
    `;

/**
 * __useOnProgressUpdateSubscription__
 *
 * To run a query within a React component, call `useOnProgressUpdateSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnProgressUpdateSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnProgressUpdateSubscription({
 *   variables: {
 *      course: // value for 'course'
 *      lesson: // value for 'lesson'
 *   },
 * });
 */
export function useOnProgressUpdateSubscription(baseOptions: Apollo.SubscriptionHookOptions<OnProgressUpdateSubscription, OnProgressUpdateSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnProgressUpdateSubscription, OnProgressUpdateSubscriptionVariables>(OnProgressUpdateDocument, options);
      }
export type OnProgressUpdateSubscriptionHookResult = ReturnType<typeof useOnProgressUpdateSubscription>;
export type OnProgressUpdateSubscriptionResult = Apollo.SubscriptionResult<OnProgressUpdateSubscription>;
export const OnUserConnectDocument = gql`
    subscription OnUserConnect {
  users: userSubscription
}
    `;

/**
 * __useOnUserConnectSubscription__
 *
 * To run a query within a React component, call `useOnUserConnectSubscription` and pass it any options that fit your needs.
 * When your component renders, `useOnUserConnectSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useOnUserConnectSubscription({
 *   variables: {
 *   },
 * });
 */
export function useOnUserConnectSubscription(baseOptions?: Apollo.SubscriptionHookOptions<OnUserConnectSubscription, OnUserConnectSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<OnUserConnectSubscription, OnUserConnectSubscriptionVariables>(OnUserConnectDocument, options);
      }
export type OnUserConnectSubscriptionHookResult = ReturnType<typeof useOnUserConnectSubscription>;
export type OnUserConnectSubscriptionResult = Apollo.SubscriptionResult<OnUserConnectSubscription>;
export const GetConnectedUsersDocument = gql`
    query getConnectedUsers {
  users: getConnectedUsers
}
    `;

/**
 * __useGetConnectedUsersQuery__
 *
 * To run a query within a React component, call `useGetConnectedUsersQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetConnectedUsersQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetConnectedUsersQuery({
 *   variables: {
 *   },
 * });
 */
export function useGetConnectedUsersQuery(baseOptions?: Apollo.QueryHookOptions<GetConnectedUsersQuery, GetConnectedUsersQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetConnectedUsersQuery, GetConnectedUsersQueryVariables>(GetConnectedUsersDocument, options);
      }
export function useGetConnectedUsersLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetConnectedUsersQuery, GetConnectedUsersQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetConnectedUsersQuery, GetConnectedUsersQueryVariables>(GetConnectedUsersDocument, options);
        }
export type GetConnectedUsersQueryHookResult = ReturnType<typeof useGetConnectedUsersQuery>;
export type GetConnectedUsersLazyQueryHookResult = ReturnType<typeof useGetConnectedUsersLazyQuery>;
export type GetConnectedUsersQueryResult = Apollo.QueryResult<GetConnectedUsersQuery, GetConnectedUsersQueryVariables>;
export const GetLessonsDocument = gql`
    query getLessons($course: String!) {
  lessons: getLessons(course: $course)
}
    `;

/**
 * __useGetLessonsQuery__
 *
 * To run a query within a React component, call `useGetLessonsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetLessonsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetLessonsQuery({
 *   variables: {
 *      course: // value for 'course'
 *   },
 * });
 */
export function useGetLessonsQuery(baseOptions: Apollo.QueryHookOptions<GetLessonsQuery, GetLessonsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetLessonsQuery, GetLessonsQueryVariables>(GetLessonsDocument, options);
      }
export function useGetLessonsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetLessonsQuery, GetLessonsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetLessonsQuery, GetLessonsQueryVariables>(GetLessonsDocument, options);
        }
export type GetLessonsQueryHookResult = ReturnType<typeof useGetLessonsQuery>;
export type GetLessonsLazyQueryHookResult = ReturnType<typeof useGetLessonsLazyQuery>;
export type GetLessonsQueryResult = Apollo.QueryResult<GetLessonsQuery, GetLessonsQueryVariables>;
export const DeleteCourseDocument = gql`
    mutation deleteCourse($course: String!) {
  status: purgeCourse(course: $course)
}
    `;
export type DeleteCourseMutationFn = Apollo.MutationFunction<DeleteCourseMutation, DeleteCourseMutationVariables>;

/**
 * __useDeleteCourseMutation__
 *
 * To run a mutation, you first call `useDeleteCourseMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteCourseMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteCourseMutation, { data, loading, error }] = useDeleteCourseMutation({
 *   variables: {
 *      course: // value for 'course'
 *   },
 * });
 */
export function useDeleteCourseMutation(baseOptions?: Apollo.MutationHookOptions<DeleteCourseMutation, DeleteCourseMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteCourseMutation, DeleteCourseMutationVariables>(DeleteCourseDocument, options);
      }
export type DeleteCourseMutationHookResult = ReturnType<typeof useDeleteCourseMutation>;
export type DeleteCourseMutationResult = Apollo.MutationResult<DeleteCourseMutation>;
export type DeleteCourseMutationOptions = Apollo.BaseMutationOptions<DeleteCourseMutation, DeleteCourseMutationVariables>;
export const DeleteLessonDocument = gql`
    mutation deleteLesson($course: String!, $lesson: String!) {
  status: purgeLesson(course: $course, lesson: $lesson)
}
    `;
export type DeleteLessonMutationFn = Apollo.MutationFunction<DeleteLessonMutation, DeleteLessonMutationVariables>;

/**
 * __useDeleteLessonMutation__
 *
 * To run a mutation, you first call `useDeleteLessonMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteLessonMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteLessonMutation, { data, loading, error }] = useDeleteLessonMutation({
 *   variables: {
 *      course: // value for 'course'
 *      lesson: // value for 'lesson'
 *   },
 * });
 */
export function useDeleteLessonMutation(baseOptions?: Apollo.MutationHookOptions<DeleteLessonMutation, DeleteLessonMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<DeleteLessonMutation, DeleteLessonMutationVariables>(DeleteLessonDocument, options);
      }
export type DeleteLessonMutationHookResult = ReturnType<typeof useDeleteLessonMutation>;
export type DeleteLessonMutationResult = Apollo.MutationResult<DeleteLessonMutation>;
export type DeleteLessonMutationOptions = Apollo.BaseMutationOptions<DeleteLessonMutation, DeleteLessonMutationVariables>;